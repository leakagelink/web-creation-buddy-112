CREATE TABLE public.thali_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_name text NOT NULL,
  room_number text NOT NULL,
  guest_name text NOT NULL,
  mobile_number text NOT NULL,
  items text NOT NULL,
  total_amount integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.thali_orders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.thali_orders TO authenticated;
GRANT ALL ON public.thali_orders TO service_role;
ALTER TABLE public.thali_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can place a thali order" ON public.thali_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view thali orders" ON public.thali_orders FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update thali orders" ON public.thali_orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete thali orders" ON public.thali_orders FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));