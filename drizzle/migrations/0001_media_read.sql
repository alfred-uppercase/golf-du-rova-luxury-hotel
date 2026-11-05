CREATE POLICY "Staff read media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND public.is_staff(auth.uid()));