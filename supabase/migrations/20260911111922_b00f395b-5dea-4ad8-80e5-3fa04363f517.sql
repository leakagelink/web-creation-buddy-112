-- ROOMS
CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  price integer NOT NULL DEFAULT 499,
  subtitle text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  badge text,
  image_url text,
  description text NOT NULL DEFAULT '',
  highlights text[] NOT NULL DEFAULT '{}',
  size text NOT NULL DEFAULT '',
  occupancy text NOT NULL DEFAULT '',
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.rooms TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rooms TO authenticated;
GRANT ALL ON public.rooms TO service_role;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visible rooms" ON public.rooms FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can view all rooms" ON public.rooms FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert rooms" ON public.rooms FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update rooms" ON public.rooms FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete rooms" ON public.rooms FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- THALIS
CREATE TABLE public.thalis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  price integer NOT NULL DEFAULT 0,
  items text[] NOT NULL DEFAULT '{}',
  badge text,
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.thalis TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.thalis TO authenticated;
GRANT ALL ON public.thalis TO service_role;
ALTER TABLE public.thalis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visible thalis" ON public.thalis FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can view all thalis" ON public.thalis FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert thalis" ON public.thalis FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update thalis" ON public.thalis FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete thalis" ON public.thalis FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_thalis_updated_at BEFORE UPDATE ON public.thalis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- REVIEWS
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  text text NOT NULL DEFAULT '',
  stay text NOT NULL DEFAULT '',
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visible reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can view all reviews" ON public.reviews FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update reviews" ON public.reviews FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete reviews" ON public.reviews FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- FAQS
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL DEFAULT '',
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visible faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can view all faqs" ON public.faqs FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update faqs" ON public.faqs FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete faqs" ON public.faqs FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- AMENITIES
CREATE TABLE public.amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  sub text NOT NULL DEFAULT '',
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.amenities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.amenities TO authenticated;
GRANT ALL ON public.amenities TO service_role;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visible amenities" ON public.amenities FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can view all amenities" ON public.amenities FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert amenities" ON public.amenities FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update amenities" ON public.amenities FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete amenities" ON public.amenities FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_amenities_updated_at BEFORE UPDATE ON public.amenities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ATTRACTIONS
CREATE TABLE public.attractions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  distance text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.attractions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attractions TO authenticated;
GRANT ALL ON public.attractions TO service_role;
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visible attractions" ON public.attractions FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Admins can view all attractions" ON public.attractions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert attractions" ON public.attractions FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update attractions" ON public.attractions FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete attractions" ON public.attractions FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_attractions_updated_at BEFORE UPDATE ON public.attractions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- SITE SETTINGS (single row)
CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  phone text NOT NULL DEFAULT '',
  alt_phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  whatsapp_message text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_single_row CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update settings" ON public.site_settings FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- COUPONS: admin management
CREATE POLICY "Admins can view all coupons" ON public.coupons FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert coupons" ON public.coupons FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update coupons" ON public.coupons FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete coupons" ON public.coupons FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupons TO authenticated;
GRANT ALL ON public.coupons TO service_role;

-- SEED existing content
INSERT INTO public.rooms (slug, name, price, subtitle, tags, badge, description, highlights, size, occupancy, sort_order) VALUES
('smart','Smart Room',499,'Shared Bathroom',ARRAY['1 Guest','Free Wi-Fi'],'Best Value','A cosy, budget-friendly room designed for solo travellers. Clean single bed, fresh linen, high-speed Wi-Fi and a hygienic shared bathroom — everything you need for a comfortable night near the ghats without stretching your budget.',ARRAY['Comfortable single bed','Shared hygienic bathroom','High-speed free Wi-Fi','Daily housekeeping','Fresh linen & towels','CCTV secured floor'],'120 sq.ft','1 Guest',1),
('comfort','Comfort Room',699,'Attached Bathroom',ARRAY['2 Guests','Free Wi-Fi'],NULL,'Perfect for couples and two-person stays, the Comfort Room comes with a private attached bathroom, a plush double bed, fresh towels and 24x7 hot water. Enjoy privacy and cleanliness at a pocket-friendly price.',ARRAY['Private attached bathroom','Comfortable double bed','24x7 hot water','Free high-speed Wi-Fi','Daily housekeeping','Power backup'],'160 sq.ft','2 Guests',2),
('premium','Premium Room',999,'Attached Bathroom + Extra Amenities',ARRAY['2 Guests','AC Room','Free Wi-Fi'],'Most Popular','Our most loved room — fully air-conditioned with an attached bathroom, premium bedding, a work desk and a flat-screen TV. Ideal for guests who want extra comfort after a long day exploring Varanasi.',ARRAY['Air conditioning','Private attached bathroom','Work desk & chair','Flat-screen TV','Premium bedding','Free high-speed Wi-Fi','24x7 hot water'],'200 sq.ft','2 Guests',3),
('signature','Signature Room',1499,'Larger Room + Extra Amenities',ARRAY['2 Guests','AC Room','Free Wi-Fi'],NULL,'Our most spacious and luxurious option. The Signature Room offers a king-size bed, elegant interiors, a seating area, AC, premium toiletries and a large attached bathroom — a truly relaxing stay at House499.',ARRAY['Spacious king-size bed','Air conditioning','Seating area','Premium toiletries','Large attached bathroom','Flat-screen TV','Free high-speed Wi-Fi','Room service'],'280 sq.ft','2 Guests',4);

INSERT INTO public.thalis (slug, name, price, items, badge, sort_order) VALUES
('mini','Mini Thali',80,ARRAY['2 Roti','Dal','Seasonal Sabzi','Rice','Salad / Achar'],NULL,1),
('normal','Normal Thali',120,ARRAY['4 Roti','Dal Tadka','1 Seasonal Sabzi','Rice','Salad','Achar'],'Best Seller',2),
('special','Special Thali',180,ARRAY['4 Roti / 1 Paratha','Dal Tadka','2 Seasonal Sabzi','Rice','Salad','Achar','Sweet'],NULL,3);

INSERT INTO public.reviews (name, city, rating, text, stay, sort_order) VALUES
('Rahul Sharma','Delhi',5,'Room bilkul clean thi aur staff bahut helpful. ₹499 me itni achhi facility expect nahi ki thi. Highly recommended!','Smart Room · 2 Nights',1),
('Priya Verma','Lucknow',5,'Best budget stay in Varanasi. Washroom spotless tha, Wi-Fi bhi fast. Ghat sirf 10 minute door hai.','Comfort Room · 3 Nights',2),
('Amit Kumar','Patna',4,'Thali ekdum ghar jaisi lagi. Fresh aur hygienic. Room chhota tha par bilkul clean aur comfortable.','Premium Room · 1 Night',3),
('Sneha Iyer','Mumbai',5,'Solo female traveller ke liye safe feel hua — CCTV aur 24x7 support ne confidence diya. Booking process easy tha.','Comfort Room · 2 Nights',4),
('Vikram Singh','Kanpur',5,'Value for money! Family ke saath gaya tha, AC room ne mast stay karaya. Check-in bina kisi jhanjhat hua.','Premium Room · 2 Nights',5),
('Anjali Gupta','Kolkata',4,'Location achhi hai, station paas hai. Special thali must try — sweet ke saath complete meal. Wapas aaungi!','Signature Room · 1 Night',6);

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('Check-in aur check-out ka time kya hai?','Check-in 12:00 PM se hai aur check-out 11:00 AM tak. Early check-in availability par subject hai — call karke confirm kar lein.',1),
('Kaunsa ID proof chahiye?','Check-in par valid government ID (Aadhaar, DL, Passport, Voter ID) zaroori hai. Har guest ka ID chahiye hota hai.',2),
('Cancellation policy kya hai?','Check-in se 24 ghante pehle tak cancellation free hai. Uske baad first night ka charge lag sakta hai.',3),
('Kya thali room me deliver hoti hai?','Ji haan! Fresh thali aapke room me deliver hoti hai. Order aap booking me add kar sakte hain ya stay ke dauran bhi.',4),
('Parking available hai?','Ji haan, free parking property ke paas available hai — two wheeler aur car dono ke liye.',5),
('Kya couples/families allowed hain?','Ji haan, married couples aur families welcome hain. Valid ID proof sabhi guests ka chahiye.',6);

INSERT INTO public.amenities (title, sub, sort_order) VALUES
('Free Wi-Fi','High Speed Internet',1),
('24x7 Support','Always Here for You',2),
('Power Backup','Uninterrupted Comfort',3),
('Daily Housekeeping','Clean & Hygienic Rooms',4),
('CCTV Security','Your Safety, Our Priority',5),
('Easy Check-in','Hassle Free Process',6);

INSERT INTO public.attractions (name, distance, note, sort_order) VALUES
('Kashi Vishwanath Temple','4 km','One of the 12 Jyotirlingas — the heart of Varanasi.',1),
('Dashashwamedh Ghat','4.5 km','Famous Ganga Aarti every evening at sunset.',2),
('Assi Ghat','5 km','Peaceful morning aarti and yoga by the river.',3),
('Sarnath','10 km','Where Buddha gave his first sermon — stupas & museum.',4),
('Varanasi Junction (Station)','3 km','Main railway station, easy auto/tuk-tuk ride.',5),
('Lal Bahadur Shastri Airport','26 km','Around 45–60 minutes by taxi.',6);

INSERT INTO public.site_settings (id, phone, alt_phone, email, address, whatsapp_message) VALUES
(1,'9454865382','9511173635','bookinghouse499@gmail.com','Varanasi, Uttar Pradesh, India','Hello House499! I want to book a room.');