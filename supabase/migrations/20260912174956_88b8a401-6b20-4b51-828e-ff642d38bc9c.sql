CREATE TABLE public.partner_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  property_name TEXT NOT NULL,
  property_type TEXT NOT NULL DEFAULT 'Hotel',
  city TEXT NOT NULL,
  address TEXT,
  rooms_count INTEGER NOT NULL DEFAULT 0,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.partner_leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_leads TO authenticated;
GRANT ALL ON public.partner_leads TO service_role;

ALTER TABLE public.partner_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a partner request"
  ON public.partner_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view partner requests"
  ON public.partner_leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update partner requests"
  ON public.partner_leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete partner requests"
  ON public.partner_leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));