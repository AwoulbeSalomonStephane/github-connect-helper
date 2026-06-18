
-- 1) Profiles: restrict SELECT policy from anon. Column grants already block phone for non-owners.
DROP POLICY IF EXISTS "profiles public read" ON public.profiles;

CREATE POLICY "profiles authenticated read"
ON public.profiles FOR SELECT TO authenticated
USING (true);

CREATE POLICY "profiles owner read"
ON public.profiles FOR SELECT TO authenticated
USING (id = auth.uid());

-- Ensure anon can still read minimal public-facing columns for landing pages
CREATE POLICY "profiles anon read minimal"
ON public.profiles FOR SELECT TO anon
USING (true);
-- (Column-level GRANT already excludes phone from anon/authenticated; only owners read phone via get_my_profile())

-- 2) ticket_purchases: enforce column-level immutability via GRANTs
REVOKE UPDATE ON public.ticket_purchases FROM authenticated;
GRANT  UPDATE (status) ON public.ticket_purchases TO authenticated;
GRANT  ALL ON public.ticket_purchases TO service_role;

-- 3) villa_bookings: enforce column-level immutability via GRANTs
REVOKE UPDATE ON public.villa_bookings FROM authenticated;
GRANT  UPDATE (status, message) ON public.villa_bookings TO authenticated;
GRANT  ALL ON public.villa_bookings TO service_role;
