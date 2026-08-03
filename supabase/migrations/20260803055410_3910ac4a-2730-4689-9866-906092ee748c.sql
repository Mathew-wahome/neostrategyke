CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid UUID := auth.uid();
  existing INT;
BEGIN
  IF uid IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT count(*) INTO existing FROM public.staff_users;
  IF existing > 0 THEN
    RETURN FALSE;
  END IF;

  INSERT INTO public.staff_users (user_id, email, full_name, role)
  SELECT uid, u.email, COALESCE(u.raw_user_meta_data->>'full_name', u.email), 'admin'
  FROM auth.users u WHERE u.id = uid
  ON CONFLICT (user_id) DO NOTHING;

  RETURN TRUE;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;