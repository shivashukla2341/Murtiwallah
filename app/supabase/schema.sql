-- Murtiwallah storefront schema + starter catalog
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: tables use IF NOT EXISTS and seed rows upsert on slug.

create extension if not exists pgcrypto;

-- ─── categories ──────────────────────────────────────────────────────────────

create table if not exists public.categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  hindi         text not null,
  description   text,
  product_count integer,
  created_at    timestamptz not null default now()
);

alter table public.categories enable row level security;

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories"
  on public.categories for select
  to anon, authenticated
  using (true);

-- ─── products ────────────────────────────────────────────────────────────────

create table if not exists public.products (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  hindi_name        text,
  category_slug     text not null references public.categories (slug),
  material          text not null,
  height            text not null,
  weight            text,
  moq               text not null,
  rating            numeric(2, 1) not null default 0,
  review_count      integer,
  price             numeric(10, 2) not null,
  compare_at_price  numeric(10, 2),
  badge             text,
  occasions         text[] not null default '{}',
  images            text[] not null default '{}',
  specs             jsonb not null default '[]',
  price_tiers       jsonb,
  stock             text not null default 'in-stock'
                      check (stock in ('in-stock', 'made-to-order', 'out-of-stock')),
  stock_label       text,
  description       text,
  created_at        timestamptz not null default now()
);

create index if not exists products_category_slug_idx on public.products (category_slug);

alter table public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  to anon, authenticated
  using (true);

-- ─── seed: categories ────────────────────────────────────────────────────────
-- "ram-darbar" is added here (not in the original mock list) so the
-- "Ram Darbar Set" product below has a valid category to link to.

insert into public.categories (slug, name, hindi, product_count) values
  ('ganesha',    'Ganesha',           'गणेश',       148),
  ('krishna',    'Krishna',           'कृष्ण',      96),
  ('shiva',      'Shiva',             'शिव',        84),
  ('durga',      'Durga',             'दुर्गा',      62),
  ('lakshmi',    'Lakshmi',           'लक्ष्मी',     71),
  ('hanuman',    'Hanuman',           'हनुमान',     113),
  ('saibaba',    'Sai Baba',          'साईं बाबा',   54),
  ('buddha',     'Buddha',            'बुद्ध',       39),
  ('bells',      'Temple Bells',      'घंटी',        28),
  ('showpieces', 'Metal Showpieces',  'शोपीस',       47),
  ('ram-darbar', 'Ram Darbar',        'राम दरबार',   1)
on conflict (slug) do nothing;

-- ─── seed: products ──────────────────────────────────────────────────────────
-- These are the Phase-1 mock catalog items, carried over as placeholder rows.
-- Edit any row's price / compare_at_price / description etc. directly in the
-- Supabase Table Editor at any time — the storefront reads live, no redeploy
-- needed. Product photos are NOT read from the `images` column below; they
-- come from /public/products/{slug}.jpg per the naming convention (see the
-- image checklist provided separately).

insert into public.products
  (slug, name, hindi_name, category_slug, material, height, weight, moq, rating, review_count,
   price, compare_at_price, badge, occasions, images, specs, price_tiers, stock, stock_label, description)
values
  ('panchmukhi-hanuman-murti', 'Panchmukhi Hanuman Murti', 'पंचमुखी हनुमान', 'hanuman', 'Brass', '18 in', '6.2 kg', '10 pcs', 4.9, 312,
   8400, 10500, 'Wholesale', ARRAY['Diwali','Temple Opening'], ARRAY['/products/panchmukhi-hanuman-murti.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"18 in"},{"k":"Weight","v":"6.2 kg"},{"k":"Finish","v":"Antique gold-tone"},{"k":"Origin","v":"Aligarh, Uttar Pradesh"},{"k":"MOQ","v":"10 pieces"}]'::jsonb,
   '[{"label":"10 – 49 pcs","price":8400},{"label":"50 – 199 pcs","price":7650},{"label":"200+ pcs","price":6900}]'::jsonb,
   'made-to-order', 'Made to order · ships in 12–15 days',
   'Hand-cast in a single mould and individually hand-finished by our Aligarh brass karigars, this five-faced Hanuman murti is suited to home temples, dealer shelves and temple sanctums alike. Every piece is inspected for casting purity and finish before dispatch.'),

  ('nataraja-shiva', 'Nataraja Shiva', 'नटराज शिव', 'shiva', 'Bronze', '24 in', '9.1 kg', '5 pcs', 4.8, 168,
   21200, null, 'Bestseller', ARRAY['Housewarming','Corporate Gifts'], ARRAY['/products/nataraja-shiva.jpg'],
   '[{"k":"Material","v":"Bronze"},{"k":"Height","v":"24 in"},{"k":"Weight","v":"9.1 kg"},{"k":"Finish","v":"Lost-wax cast, dark patina"},{"k":"Origin","v":"Moradabad, Uttar Pradesh"},{"k":"MOQ","v":"5 pieces"}]'::jsonb,
   '[{"label":"5 – 19 pcs","price":21200},{"label":"20 – 99 pcs","price":19400},{"label":"100+ pcs","price":17800}]'::jsonb,
   'in-stock', 'In stock',
   'A lost-wax cast Nataraja in the classical Chola proportion, finished with a hand-rubbed dark bronze patina. Popular with interior designers and hotel lobbies for its sculptural silhouette.'),

  ('seated-ganesha', 'Seated Ganesha', 'बैठे गणेश', 'ganesha', 'White Marble', '12 in', '8 kg', '20 pcs', 5.0, 204,
   6750, null, 'New', ARRAY['Ganesh Chaturthi','Housewarming'], ARRAY['/products/seated-ganesha.jpg'],
   '[{"k":"Material","v":"White Marble"},{"k":"Height","v":"12 in"},{"k":"Weight","v":"8 kg"},{"k":"Finish","v":"Hand-polished, gold detailing"},{"k":"Origin","v":"Jaipur, Rajasthan"},{"k":"MOQ","v":"20 pieces"}]'::jsonb,
   '[{"label":"20 – 49 pcs","price":6750},{"label":"50 – 199 pcs","price":6100},{"label":"200+ pcs","price":5500}]'::jsonb,
   'made-to-order', 'Made to order · ships in 10–14 days',
   'Carved from a single block of white Makrana marble and finished with fine gold detailing on the crown and ornaments — a dealer favourite for Ganesh Chaturthi season.'),

  ('radha-krishna-panchdhatu', 'Radha Krishna', 'राधा कृष्ण', 'krishna', 'Panchdhatu', '15 in', '4.5 kg', '10 pcs', 4.9, 141,
   12900, null, 'Festival', ARRAY['Diwali','Wedding'], ARRAY['/products/radha-krishna-panchdhatu.jpg'],
   '[{"k":"Material","v":"Panchdhatu (5-metal alloy)"},{"k":"Height","v":"15 in"},{"k":"Weight","v":"4.5 kg"},{"k":"Finish","v":"Antique gold-tone"},{"k":"Origin","v":"Moradabad, Uttar Pradesh"},{"k":"MOQ","v":"10 pieces"}]'::jsonb,
   '[{"label":"10 – 49 pcs","price":12900},{"label":"50+ pcs","price":11600}]'::jsonb,
   'in-stock', 'In stock',
   'Cast in traditional panchdhatu — a five-metal alloy considered auspicious for home temples — this Radha Krishna pair is a top wedding-gift seller.'),

  ('standing-durga', 'Standing Durga', 'खड़ी दुर्गा', 'durga', 'Brass', '20 in', '7 kg', '10 pcs', 4.7, 88,
   16500, null, 'Gift', ARRAY['Navratri'], ARRAY['/products/standing-durga.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"20 in"},{"k":"Weight","v":"7 kg"},{"k":"Finish","v":"Antique gold-tone"},{"k":"Origin","v":"Aligarh, Uttar Pradesh"},{"k":"MOQ","v":"10 pieces"}]'::jsonb,
   null, 'in-stock', 'In stock',
   'An eighteen-armed standing Durga cast in solid brass, each weapon individually finished — a Navratri season bestseller for temple trusts and dealers alike.'),

  ('lakshmi-on-lotus', 'Lakshmi on Lotus', 'कमल पर लक्ष्मी', 'lakshmi', 'Silver Plated', '9 in', '1.1 kg', '25 pcs', 4.8, 96,
   3100, null, 'Decor', ARRAY['Diwali','Corporate Gifts'], ARRAY['/products/lakshmi-on-lotus.jpg'],
   '[{"k":"Material","v":"Silver Plated Brass"},{"k":"Height","v":"9 in"},{"k":"Weight","v":"1.1 kg"},{"k":"Finish","v":"Mirror-polished silver plate"},{"k":"Origin","v":"Moradabad, Uttar Pradesh"},{"k":"MOQ","v":"25 pieces"}]'::jsonb,
   null, 'in-stock', 'In stock',
   'A compact silver-plated Lakshmi seated on a full-bloom lotus — sized for corporate Diwali gifting and dealer counter displays.'),

  ('meditating-buddha', 'Meditating Buddha', null, 'buddha', 'Resin', '14 in', '2.3 kg', '20 pcs', 4.6, 74,
   1450, null, 'Gift', ARRAY['Housewarming','Corporate Gifts'], ARRAY['/products/meditating-buddha.jpg'],
   '[{"k":"Material","v":"Resin, stone-finish"},{"k":"Height","v":"14 in"},{"k":"Weight","v":"2.3 kg"},{"k":"Finish","v":"Matte stone-grey"},{"k":"Origin","v":"Aligarh, Uttar Pradesh"},{"k":"MOQ","v":"20 pieces"}]'::jsonb,
   null, 'in-stock', 'In stock',
   'A serene meditating Buddha cast in stone-finish resin — lightweight, chip-resistant and priced for high-volume gifting and modern home décor ranges.'),

  ('sai-baba-blessing', 'Sai Baba Blessing', null, 'saibaba', 'White Marble', '16 in', '9 kg', '15 pcs', 4.9, 122,
   9800, null, 'Temple Order', ARRAY['Temple Opening'], ARRAY['/products/sai-baba-blessing.jpg'],
   '[{"k":"Material","v":"White Marble"},{"k":"Height","v":"16 in"},{"k":"Weight","v":"9 kg"},{"k":"Finish","v":"Hand-polished"},{"k":"Origin","v":"Jaipur, Rajasthan"},{"k":"MOQ","v":"15 pieces"}]'::jsonb,
   null, 'made-to-order', 'Made to order · ships in 12–15 days',
   'A hand-polished marble Sai Baba in the blessing pose, carved to shastra proportion — a recurring order for temple trusts across Maharashtra and Karnataka.'),

  ('ram-darbar-set', 'Ram Darbar Set', null, 'ram-darbar', 'Panchdhatu', '12 in', '5.8 kg', '5 pcs', 4.9, 51,
   24000, null, 'Festival', ARRAY['Diwali','Temple Opening'], ARRAY['/products/ram-darbar-set.jpg'],
   '[{"k":"Material","v":"Panchdhatu (5-metal alloy)"},{"k":"Height","v":"12 in"},{"k":"Weight","v":"5.8 kg (set of 4)"},{"k":"Finish","v":"Antique gold-tone"},{"k":"Origin","v":"Moradabad, Uttar Pradesh"},{"k":"MOQ","v":"5 sets"}]'::jsonb,
   null, 'in-stock', 'In stock',
   'The full Ram Darbar — Ram, Lakshman, Sita and Hanuman — cast as a matched set in panchdhatu for temple installs and premium home temples.'),

  ('bal-ganesh', 'Bal Ganesh', null, 'ganesha', 'Brass', '8 in', null, '20 pcs', 4.7, null,
   2200, null, 'New', ARRAY['Ganesh Chaturthi'], ARRAY['/products/bal-ganesh.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"8 in"},{"k":"MOQ","v":"20 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('dancing-ganesha', 'Dancing Ganesha', null, 'ganesha', 'Panchdhatu', '10 in', null, '15 pcs', 4.8, null,
   4600, null, 'Bestseller', ARRAY['Ganesh Chaturthi','Housewarming'], ARRAY['/products/dancing-ganesha.jpg'],
   '[{"k":"Material","v":"Panchdhatu"},{"k":"Height","v":"10 in"},{"k":"MOQ","v":"15 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('lambodar-ganesh', 'Lambodar Ganesh', null, 'ganesha', 'Brass', '14 in', null, '15 pcs', 4.6, null,
   5200, null, 'Wholesale', ARRAY['Ganesh Chaturthi'], ARRAY['/products/lambodar-ganesh.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"14 in"},{"k":"MOQ","v":"15 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('ganesh-on-lotus', 'Ganesh on Lotus', null, 'ganesha', 'White Marble', '10 in', null, '20 pcs', 4.9, null,
   3800, null, 'Gift', ARRAY['Housewarming','Corporate Gifts'], ARRAY['/products/ganesh-on-lotus.jpg'],
   '[{"k":"Material","v":"White Marble"},{"k":"Height","v":"10 in"},{"k":"MOQ","v":"20 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('riddhi-siddhi-ganesh', 'Riddhi Siddhi Ganesh', null, 'ganesha', 'Brass', '16 in', null, '10 pcs', 4.8, null,
   7400, null, 'Temple Order', ARRAY['Ganesh Chaturthi','Temple Opening'], ARRAY['/products/riddhi-siddhi-ganesh.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"16 in"},{"k":"MOQ","v":"10 pieces"}]'::jsonb,
   null, 'made-to-order', null, null),

  ('temple-ganesh-large', 'Temple Ganesh Large', null, 'ganesha', 'White Marble', '36 in', null, '2 pcs', 5.0, null,
   48000, null, 'Temple Order', ARRAY['Temple Opening'], ARRAY['/products/temple-ganesh-large.jpg'],
   '[{"k":"Material","v":"White Marble"},{"k":"Height","v":"36 in"},{"k":"MOQ","v":"2 pieces"}]'::jsonb,
   null, 'made-to-order', 'Made to order · ships in 6–8 weeks', null),

  ('eco-ganesh-clay', 'Eco Ganesh (Clay)', null, 'ganesha', 'Clay', '9 in', null, '50 pcs', 4.5, null,
   650, null, 'Festival', ARRAY['Ganesh Chaturthi'], ARRAY['/products/eco-ganesh-clay.jpg'],
   '[{"k":"Material","v":"Eco-friendly clay, natural dyes"},{"k":"Height","v":"9 in"},{"k":"MOQ","v":"50 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('priyankar-ganesh', 'Priyankar Ganesh', null, 'ganesha', 'Brass', '12 in', null, '15 pcs', 4.7, null,
   4200, null, 'New', ARRAY['Ganesh Chaturthi'], ARRAY['/products/priyankar-ganesh.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"12 in"},{"k":"MOQ","v":"15 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('modak-ganesh', 'Modak Ganesh', null, 'ganesha', 'Brass', '11 in', null, '15 pcs', 4.6, null,
   3900, null, 'Gift', ARRAY['Ganesh Chaturthi'], ARRAY['/products/modak-ganesh.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"11 in"},{"k":"MOQ","v":"15 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('chaturbhuj-hanuman', 'Chaturbhuj Hanuman', null, 'hanuman', 'Brass', '14 in', null, '10 pcs', 4.7, null,
   6900, null, 'Wholesale', ARRAY['Temple Opening'], ARRAY['/products/chaturbhuj-hanuman.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"14 in"},{"k":"MOQ","v":"10 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('bajrang-bali-flying', 'Bajrang Bali, Flying', null, 'hanuman', 'Panchdhatu', '22 in', null, '5 pcs', 4.9, null,
   11200, null, 'Bestseller', ARRAY['Temple Opening'], ARRAY['/products/bajrang-bali-flying.jpg'],
   '[{"k":"Material","v":"Panchdhatu"},{"k":"Height","v":"22 in"},{"k":"MOQ","v":"5 pieces"}]'::jsonb,
   null, 'made-to-order', null, null),

  ('hanuman-with-gada', 'Hanuman with Gada', null, 'hanuman', 'Brass', '12 in', null, '15 pcs', 4.6, null,
   5400, null, 'Gift', ARRAY['Housewarming'], ARRAY['/products/hanuman-with-gada.jpg'],
   '[{"k":"Material","v":"Brass"},{"k":"Height","v":"12 in"},{"k":"MOQ","v":"15 pieces"}]'::jsonb,
   null, 'in-stock', null, null),

  ('sankat-mochan-hanuman', 'Sankat Mochan Hanuman', null, 'hanuman', 'White Marble', '18 in', null, '10 pcs', 4.8, null,
   9800, null, 'Temple Order', ARRAY['Temple Opening'], ARRAY['/products/sankat-mochan-hanuman.jpg'],
   '[{"k":"Material","v":"White Marble"},{"k":"Height","v":"18 in"},{"k":"MOQ","v":"10 pieces"}]'::jsonb,
   null, 'made-to-order', null, null)
on conflict (slug) do nothing;
