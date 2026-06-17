
-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('user', 'organizer', 'villa_owner', 'admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- updated_at helper
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  city TEXT,
  phone TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles public read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles self insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "profiles self update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Auto-create profile + default 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)), NEW.raw_user_meta_data->>'avatar_url');
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Events
CREATE TYPE public.event_status AS ENUM ('draft','pending','approved','rejected','cancelled');
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  category TEXT,
  city TEXT NOT NULL,
  venue TEXT,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  cover_image TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  video_url TEXT,
  status public.event_status NOT NULL DEFAULT 'pending',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events public read approved" ON public.events FOR SELECT USING (status = 'approved' OR organizer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "events organizer insert" ON public.events FOR INSERT TO authenticated WITH CHECK (organizer_id = auth.uid() AND (public.has_role(auth.uid(),'organizer') OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "events organizer update" ON public.events FOR UPDATE TO authenticated USING (organizer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "events organizer delete" ON public.events FOR DELETE TO authenticated USING (organizer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE INDEX idx_events_city ON public.events(city);
CREATE INDEX idx_events_starts_at ON public.events(starts_at);
CREATE INDEX idx_events_status ON public.events(status);

-- Ticket types
CREATE TABLE public.ticket_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_xaf INTEGER NOT NULL CHECK (price_xaf >= 0),
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  sold INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.ticket_types TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.ticket_types TO authenticated;
GRANT ALL ON public.ticket_types TO service_role;
ALTER TABLE public.ticket_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ticket_types public read" ON public.ticket_types FOR SELECT USING (true);
CREATE POLICY "ticket_types organizer manage" ON public.ticket_types FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND (e.organizer_id = auth.uid() OR public.has_role(auth.uid(),'admin'))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND (e.organizer_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

-- Ticket purchases
CREATE TYPE public.purchase_status AS ENUM ('pending','paid','cancelled','refunded');
CREATE TABLE public.ticket_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  ticket_type_id UUID NOT NULL REFERENCES public.ticket_types(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_xaf INTEGER NOT NULL,
  total_xaf INTEGER NOT NULL,
  platform_fee_xaf INTEGER NOT NULL,
  organizer_payout_xaf INTEGER NOT NULL,
  status public.purchase_status NOT NULL DEFAULT 'pending',
  payment_provider TEXT,
  payment_ref TEXT,
  qr_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.ticket_purchases TO authenticated;
GRANT ALL ON public.ticket_purchases TO service_role;
ALTER TABLE public.ticket_purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "purchases own or organizer or admin" ON public.ticket_purchases FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin')
    OR EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND e.organizer_id = auth.uid()));
CREATE POLICY "purchases self insert" ON public.ticket_purchases FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "purchases self update" ON public.ticket_purchases FOR UPDATE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER ticket_purchases_updated_at BEFORE UPDATE ON public.ticket_purchases FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Villas
CREATE TYPE public.villa_status AS ENUM ('draft','pending','approved','rejected','inactive');
CREATE TABLE public.villas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  city TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  capacity INTEGER NOT NULL DEFAULT 0,
  bedrooms INTEGER NOT NULL DEFAULT 0,
  price_per_night_xaf INTEGER NOT NULL CHECK (price_per_night_xaf >= 0),
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  photos JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image TEXT,
  status public.villa_status NOT NULL DEFAULT 'pending',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.villas TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.villas TO authenticated;
GRANT ALL ON public.villas TO service_role;
ALTER TABLE public.villas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "villas public read approved" ON public.villas FOR SELECT USING (status = 'approved' OR owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "villas owner insert" ON public.villas FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid() AND (public.has_role(auth.uid(),'villa_owner') OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "villas owner update" ON public.villas FOR UPDATE TO authenticated USING (owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "villas owner delete" ON public.villas FOR DELETE TO authenticated USING (owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER villas_updated_at BEFORE UPDATE ON public.villas FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE INDEX idx_villas_city ON public.villas(city);

-- Villa bookings
CREATE TYPE public.booking_status AS ENUM ('pending','accepted','rejected','cancelled','completed');
CREATE TABLE public.villa_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  villa_id UUID NOT NULL REFERENCES public.villas(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  nights INTEGER NOT NULL,
  total_xaf INTEGER NOT NULL,
  platform_fee_xaf INTEGER NOT NULL,
  owner_payout_xaf INTEGER NOT NULL,
  status public.booking_status NOT NULL DEFAULT 'pending',
  message TEXT,
  payment_provider TEXT,
  payment_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (check_out > check_in)
);
GRANT SELECT, INSERT, UPDATE ON public.villa_bookings TO authenticated;
GRANT ALL ON public.villa_bookings TO service_role;
ALTER TABLE public.villa_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookings visible to guest or owner or admin" ON public.villa_bookings FOR SELECT TO authenticated
  USING (guest_id = auth.uid() OR public.has_role(auth.uid(),'admin')
    OR EXISTS (SELECT 1 FROM public.villas v WHERE v.id = villa_id AND v.owner_id = auth.uid()));
CREATE POLICY "bookings guest insert" ON public.villa_bookings FOR INSERT TO authenticated WITH CHECK (guest_id = auth.uid());
CREATE POLICY "bookings guest or owner update" ON public.villa_bookings FOR UPDATE TO authenticated
  USING (guest_id = auth.uid() OR public.has_role(auth.uid(),'admin')
    OR EXISTS (SELECT 1 FROM public.villas v WHERE v.id = villa_id AND v.owner_id = auth.uid()));
CREATE TRIGGER villa_bookings_updated_at BEFORE UPDATE ON public.villa_bookings FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Favorites
CREATE TYPE public.favorite_kind AS ENUM ('event','villa');
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind public.favorite_kind NOT NULL,
  target_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, kind, target_id)
);
GRANT SELECT, INSERT, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favorites own" ON public.favorites FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Follows
CREATE TABLE public.follows (
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  followed_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, followed_id),
  CHECK (follower_id <> followed_id)
);
GRANT SELECT ON public.follows TO anon, authenticated;
GRANT INSERT, DELETE ON public.follows TO authenticated;
GRANT ALL ON public.follows TO service_role;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "follows public read" ON public.follows FOR SELECT USING (true);
CREATE POLICY "follows self write" ON public.follows FOR INSERT TO authenticated WITH CHECK (follower_id = auth.uid());
CREATE POLICY "follows self delete" ON public.follows FOR DELETE TO authenticated USING (follower_id = auth.uid());

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind public.favorite_kind NOT NULL,
  target_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, kind, target_id)
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews public read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews self write" ON public.reviews FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "reviews self update" ON public.reviews FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "reviews self delete" ON public.reviews FOR DELETE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications own" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "notifications own update" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "notifications own delete" ON public.notifications FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Applications (organizer / villa owner onboarding)
CREATE TYPE public.application_status AS ENUM ('pending','approved','rejected');
CREATE TABLE public.organizer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  bio TEXT,
  city TEXT,
  phone TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  status public.application_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.organizer_applications TO authenticated;
GRANT ALL ON public.organizer_applications TO service_role;
ALTER TABLE public.organizer_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "org_app own read" ON public.organizer_applications FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "org_app self insert" ON public.organizer_applications FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "org_app admin update" ON public.organizer_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER org_app_updated_at BEFORE UPDATE ON public.organizer_applications FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.villa_owner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  legal_name TEXT NOT NULL,
  city TEXT,
  phone TEXT,
  villa_count INTEGER DEFAULT 1,
  notes TEXT,
  status public.application_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.villa_owner_applications TO authenticated;
GRANT ALL ON public.villa_owner_applications TO service_role;
ALTER TABLE public.villa_owner_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "villa_app own read" ON public.villa_owner_applications FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "villa_app self insert" ON public.villa_owner_applications FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "villa_app admin update" ON public.villa_owner_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER villa_app_updated_at BEFORE UPDATE ON public.villa_owner_applications FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
