
-- 1) profiles: hide phone from public; only owner/admin can read phone
REVOKE SELECT ON public.profiles FROM anon, authenticated;
GRANT SELECT (id, display_name, username, avatar_url, bio, verified, locale, city, created_at, updated_at)
  ON public.profiles TO anon, authenticated;
GRANT SELECT (phone) ON public.profiles TO service_role;

-- Allow owner to read own phone via RPC (avoids exposing phone column broadly)
CREATE OR REPLACE FUNCTION public.get_my_profile()
RETURNS SETOF public.profiles
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT * FROM public.profiles WHERE id = auth.uid() $$;
REVOKE EXECUTE ON FUNCTION public.get_my_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_profile() TO authenticated;

-- 2) ticket_purchases: prevent buyers from mutating financial / status fields
DROP POLICY IF EXISTS "purchases self update" ON public.ticket_purchases;

CREATE POLICY "purchases admin update"
ON public.ticket_purchases FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "purchases buyer cancel"
ON public.ticket_purchases FOR UPDATE TO authenticated
USING (user_id = auth.uid() AND status = 'pending'::purchase_status)
WITH CHECK (user_id = auth.uid() AND status = 'cancelled'::purchase_status);

-- Trigger guard: buyers can ONLY change status (to cancelled), nothing else
CREATE OR REPLACE FUNCTION public.guard_ticket_purchase_update()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;
  IF NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.event_id IS DISTINCT FROM OLD.event_id
     OR NEW.ticket_type_id IS DISTINCT FROM OLD.ticket_type_id
     OR NEW.quantity IS DISTINCT FROM OLD.quantity
     OR NEW.unit_price_xaf IS DISTINCT FROM OLD.unit_price_xaf
     OR NEW.total_xaf IS DISTINCT FROM OLD.total_xaf
     OR NEW.platform_fee_xaf IS DISTINCT FROM OLD.platform_fee_xaf
     OR NEW.organizer_payout_xaf IS DISTINCT FROM OLD.organizer_payout_xaf
     OR NEW.payment_provider IS DISTINCT FROM OLD.payment_provider
     OR NEW.payment_ref IS DISTINCT FROM OLD.payment_ref
     OR NEW.qr_code IS DISTINCT FROM OLD.qr_code THEN
    RAISE EXCEPTION 'Only admins can modify financial or payment fields on purchases';
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_guard_ticket_purchase_update ON public.ticket_purchases;
CREATE TRIGGER trg_guard_ticket_purchase_update
BEFORE UPDATE ON public.ticket_purchases
FOR EACH ROW EXECUTE FUNCTION public.guard_ticket_purchase_update();

-- 3) villa_bookings: prevent guests from mutating financial / status fields
DROP POLICY IF EXISTS "bookings guest or owner update" ON public.villa_bookings;

CREATE POLICY "bookings admin update"
ON public.villa_bookings FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "bookings owner update"
ON public.villa_bookings FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.villas v WHERE v.id = villa_bookings.villa_id AND v.owner_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.villas v WHERE v.id = villa_bookings.villa_id AND v.owner_id = auth.uid()));

CREATE POLICY "bookings guest update message or cancel"
ON public.villa_bookings FOR UPDATE TO authenticated
USING (guest_id = auth.uid())
WITH CHECK (guest_id = auth.uid());

CREATE OR REPLACE FUNCTION public.guard_villa_booking_update()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  is_owner boolean;
BEGIN
  IF public.has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;
  SELECT EXISTS (SELECT 1 FROM public.villas v WHERE v.id = OLD.villa_id AND v.owner_id = auth.uid()) INTO is_owner;
  IF is_owner THEN
    RETURN NEW;
  END IF;
  -- guest: allow only message + status='cancelled'
  IF NEW.villa_id IS DISTINCT FROM OLD.villa_id
     OR NEW.guest_id IS DISTINCT FROM OLD.guest_id
     OR NEW.check_in IS DISTINCT FROM OLD.check_in
     OR NEW.check_out IS DISTINCT FROM OLD.check_out
     OR NEW.nights IS DISTINCT FROM OLD.nights
     OR NEW.guests IS DISTINCT FROM OLD.guests
     OR NEW.total_xaf IS DISTINCT FROM OLD.total_xaf
     OR NEW.platform_fee_xaf IS DISTINCT FROM OLD.platform_fee_xaf
     OR NEW.owner_payout_xaf IS DISTINCT FROM OLD.owner_payout_xaf
     OR NEW.payment_provider IS DISTINCT FROM OLD.payment_provider
     OR NEW.payment_ref IS DISTINCT FROM OLD.payment_ref THEN
    RAISE EXCEPTION 'Guests can only edit message or cancel the booking';
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status AND NEW.status <> 'cancelled'::booking_status THEN
    RAISE EXCEPTION 'Guests can only change status to cancelled';
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_guard_villa_booking_update ON public.villa_bookings;
CREATE TRIGGER trg_guard_villa_booking_update
BEFORE UPDATE ON public.villa_bookings
FOR EACH ROW EXECUTE FUNCTION public.guard_villa_booking_update();

-- 4) user_roles: explicit admin-only write policies
CREATE POLICY "user_roles admin insert"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "user_roles admin update"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "user_roles admin delete"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "user_roles admin select all"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
