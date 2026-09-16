ALTER TABLE public.partner_leads
  ADD COLUMN IF NOT EXISTS photos text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS amenities text[] NOT NULL DEFAULT '{}';

CREATE POLICY "Anyone can upload partner photos"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'partner-photos');

CREATE POLICY "Admins can view partner photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'partner-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete partner photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'partner-photos' AND public.has_role(auth.uid(), 'admin'));