CREATE TABLE public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  location text NOT NULL,
  address text,
  rating numeric NOT NULL DEFAULT 4.5,
  reviews integer NOT NULL DEFAULT 0,
  from_price integer NOT NULL DEFAULT 499,
  image_url text,
  coming_soon boolean NOT NULL DEFAULT false,
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible properties" ON public.properties FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can view all properties" ON public.properties FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert properties" ON public.properties FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update properties" ON public.properties FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete properties" ON public.properties FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.properties (slug, name, location, address, rating, reviews, from_price, coming_soon, visible, sort_order) VALUES
('varanasi', 'House499 Varanasi', 'Sarnath, Varanasi, UP', NULL, 4.6, 120, 499, false, true, 1),
('prayagraj', 'House499 Prayagraj', 'Civil Lines, Prayagraj, UP', NULL, 4.4, 98, 499, true, true, 2),
('lucknow', 'House499 Lucknow', 'Gomti Nagar, Lucknow, UP', NULL, 4.5, 110, 499, true, true, 3),
('gaya', 'House499 Gaya', 'Buddha Marg, Gaya, Bihar', NULL, 4.3, 87, 499, true, true, 4);