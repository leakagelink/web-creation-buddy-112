ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS latitude double precision, ADD COLUMN IF NOT EXISTS longitude double precision;
UPDATE public.properties SET latitude = 25.3811, longitude = 83.0214 WHERE slug = 'varanasi';
UPDATE public.properties SET latitude = 25.4484, longitude = 81.8580 WHERE slug = 'prayagraj';
UPDATE public.properties SET latitude = 26.8467, longitude = 80.9462 WHERE slug = 'lucknow';
UPDATE public.properties SET latitude = 24.7955, longitude = 84.9994 WHERE slug = 'gaya';