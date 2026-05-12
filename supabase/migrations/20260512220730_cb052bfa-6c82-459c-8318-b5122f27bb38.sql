
-- Allow public read of listings (no PII)
DROP POLICY IF EXISTS "Authenticated users can view listings" ON public.listings;
CREATE POLICY "Anyone can view listings"
ON public.listings FOR SELECT
TO anon, authenticated
USING (true);

-- Public directory view excluding email/phone
DROP VIEW IF EXISTS public.public_directory;
CREATE VIEW public.public_directory
WITH (security_invoker=on) AS
SELECT id, first_name, last_name, location, profile_type, created_at
FROM public.profiles
WHERE profile_type IN ('agent','promoteur','notaire');

-- Restrict base profiles table: only authenticated users can view
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

-- Allow anon to read the safe directory view
GRANT SELECT ON public.public_directory TO anon, authenticated;
