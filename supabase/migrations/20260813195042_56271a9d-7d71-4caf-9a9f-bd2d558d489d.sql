CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM anon, authenticated;

CREATE OR REPLACE FUNCTION private.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ SELECT EXISTS (SELECT 1 FROM public.staff_users WHERE id = _user_id) $$;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ SELECT EXISTS (SELECT 1 FROM public.staff_users WHERE id = _user_id AND role = _role) $$;

GRANT USAGE ON SCHEMA private TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_staff(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- staff-manage policies
DROP POLICY IF EXISTS "Staff manage posts" ON public.blog_posts;
CREATE POLICY "Staff manage posts" ON public.blog_posts FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage bookings" ON public.bookings;
CREATE POLICY "Staff manage bookings" ON public.bookings FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage clients" ON public.clients;
CREATE POLICY "Staff manage clients" ON public.clients FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage messages" ON public.contact_messages;
CREATE POLICY "Staff manage messages" ON public.contact_messages FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage engagements" ON public.engagements;
CREATE POLICY "Staff manage engagements" ON public.engagements FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage leads" ON public.leads;
CREATE POLICY "Staff manage leads" ON public.leads FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage orders" ON public.orders;
CREATE POLICY "Staff manage orders" ON public.orders FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage products" ON public.products;
CREATE POLICY "Staff manage products" ON public.products FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage settings" ON public.site_settings;
CREATE POLICY "Staff manage settings" ON public.site_settings FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage subscribers" ON public.subscribers;
CREATE POLICY "Staff manage subscribers" ON public.subscribers FOR ALL TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff can read staff list" ON public.staff_users;
CREATE POLICY "Staff can read staff list" ON public.staff_users FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Admins manage staff" ON public.staff_users;
CREATE POLICY "Admins manage staff" ON public.staff_users FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP FUNCTION IF EXISTS public.is_staff(uuid);
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

-- Harden public insert policies
DROP POLICY IF EXISTS "Anyone can request a call" ON public.bookings;
CREATE POLICY "Anyone can request a call" ON public.bookings FOR INSERT TO anon, authenticated
WITH CHECK (whatsapp_confirmed = false AND status = 'pending_whatsapp');

DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;
CREATE POLICY "Anyone can place an order" ON public.orders FOR INSERT TO anon, authenticated
WITH CHECK (
  payment_status = 'unpaid'
  AND delivered = false
  AND paid_at IS NULL
  AND provider = 'whatsapp'
  AND provider_reference IS NULL
  AND amount = 0
  AND status = 'pending_whatsapp'
);