-- Roles enum + user_roles table (admin access)
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null default 'user',
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can read own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Bookings
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text not null unique,
  room_id text not null,
  guest_name text not null,
  guest_phone text not null,
  guest_email text not null,
  guests int not null default 1,
  check_in date not null,
  check_out date not null,
  nights int not null default 1,
  thali_qty int not null default 0,
  special_requests text,
  coupon_code text,
  discount_amount numeric not null default 0,
  total_amount numeric not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

grant insert on public.bookings to anon;
grant select, update on public.bookings to authenticated;
grant all on public.bookings to service_role;

alter table public.bookings enable row level security;

create policy "Guests can create bookings"
  on public.bookings for insert
  to anon
  with check (true);

create policy "Admins can view all bookings"
  on public.bookings for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update booking status"
  on public.bookings for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Coupons
create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_percent int not null check (discount_percent between 1 and 100),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

grant select on public.coupons to anon;
grant all on public.coupons to service_role;

alter table public.coupons enable row level security;

create policy "Anyone can check active coupons"
  on public.coupons for select
  to anon
  using (active = true);

insert into public.coupons (code, discount_percent) values
  ('HOUSE10', 10),
  ('VARANASI5', 5)
on conflict (code) do nothing;