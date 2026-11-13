-- =========================================================================
-- IMONOKE CUP 3X3 - SUPABASE DATABASE SCHEMA
-- Skema Database Resmi: Akun Customer, Pelacakan Tiket QRIS, 
-- dan Hasil Pertandingan (Match Results & Bagan 3x3)
-- =========================================================================

-- 1. Tabel Customer / Penonton
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  whatsapp text not null,
  identity_number text,
  password_hash text,
  created_at timestamptz default now()
);

create index if not exists idx_customers_email on customers(email);
create index if not exists idx_customers_whatsapp on customers(whatsapp);

-- 2. Tabel Pemesanan & Pelacakan Tiket (Ticket Purchases)
create table if not exists ticket_purchases (
  id text primary key, -- e.g. ORD-IMO-901
  ticket_code text not null,
  tier_id text not null,
  tier_name text not null,
  customer_id uuid references customers(id) on delete set null,
  buyer_name text not null,
  buyer_whatsapp text not null,
  buyer_email text not null,
  buyer_identity_number text,
  quantity integer not null default 1,
  total_amount integer not null,
  unique_code integer not null,
  status text not null default 'Menunggu Verifikasi', -- 'Menunggu Verifikasi', 'Terverifikasi', 'Sudah Ditukar', 'Ditolak'
  payment_method text not null default 'QRIS',
  created_at text not null,
  verified_at text,
  redeemed_at text,
  rejection_reason text,
  admin_notes text
);

create index if not exists idx_ticket_customer on ticket_purchases(customer_id);
create index if not exists idx_ticket_code on ticket_purchases(ticket_code);
create index if not exists idx_ticket_whatsapp on ticket_purchases(buyer_whatsapp);
create index if not exists idx_ticket_status on ticket_purchases(status);

-- 3. Tabel Hasil Pertandingan & Live Score (Match Results)
create table if not exists match_results (
  id text primary key, -- e.g. 'm-sma-pa-1'
  match_number integer not null,
  category text not null, -- 'SMA Putra', 'SMA Putri', 'Umum'
  stage text not null, -- 'Babak 32 Besar', 'Babak 16 Besar', 'Perempat Final', dsb.
  arena text not null, -- 'GKB FIP UM Court 1', dsb.
  date text not null, -- '2026-11-14'
  time text not null, -- '09:00 WIB'
  status text not null default 'Akan Datang', -- 'Akan Datang', 'Sedang Berlangsung', 'Selesai'
  team_a jsonb not null, -- Detail Tim A ({ id, name, shortName, category, logo, origin, stats })
  team_b jsonb not null, -- Detail Tim B
  score_a integer not null default 0,
  score_b integer not null default 0,
  fouls_a integer not null default 0,
  fouls_b integer not null default 0,
  current_period text,
  time_remaining text,
  winner_id text,
  mvp_gladiator jsonb,
  period_scores jsonb,
  updated_at timestamptz default now()
);

create index if not exists idx_match_category on match_results(category);
create index if not exists idx_match_status on match_results(status);
create index if not exists idx_match_date on match_results(date);
create index if not exists idx_match_number on match_results(match_number);

-- 4. Tabel Bagan Pertandingan (Tournament Brackets)
create table if not exists tournament_brackets (
  id text primary key, -- e.g. 'pa-r1-1'
  category text not null,
  round_name text not null,
  round_index integer not null,
  match_id text,
  match_number integer,
  team_a jsonb,
  team_b jsonb,
  score_a integer,
  score_b integer,
  winner_id text,
  status text not null default 'Akan Datang',
  date text not null,
  time text not null,
  arena text,
  next_match_id text,
  next_slot text,
  loser_next_match_id text,
  updated_at timestamptz default now()
);

create index if not exists idx_brackets_cat on tournament_brackets(category);
create index if not exists idx_brackets_status on tournament_brackets(status);

-- 5. Row Level Security (RLS) & Kebijakan Akses (Public Read/Write)
alter table customers enable row level security;
alter table ticket_purchases enable row level security;
alter table match_results enable row level security;
alter table tournament_brackets enable row level security;

-- Policies untuk Customers
drop policy if exists "Allow public select customers" on customers;
create policy "Allow public select customers" on customers for select using (true);
drop policy if exists "Allow public insert customers" on customers;
create policy "Allow public insert customers" on customers for insert with check (true);
drop policy if exists "Allow public update customers" on customers;
create policy "Allow public update customers" on customers for update using (true);

-- Policies untuk Ticket Purchases
drop policy if exists "Allow public select ticket_purchases" on ticket_purchases;
create policy "Allow public select ticket_purchases" on ticket_purchases for select using (true);
drop policy if exists "Allow public insert ticket_purchases" on ticket_purchases;
create policy "Allow public insert ticket_purchases" on ticket_purchases for insert with check (true);
drop policy if exists "Allow public update ticket_purchases" on ticket_purchases;
create policy "Allow public update ticket_purchases" on ticket_purchases for update using (true);

-- Policies untuk Match Results
drop policy if exists "Allow public select match_results" on match_results;
create policy "Allow public select match_results" on match_results for select using (true);
drop policy if exists "Allow public insert match_results" on match_results;
create policy "Allow public insert match_results" on match_results for insert with check (true);
drop policy if exists "Allow public update match_results" on match_results;
create policy "Allow public update match_results" on match_results for update using (true);
drop policy if exists "Allow public delete match_results" on match_results;
create policy "Allow public delete match_results" on match_results for delete using (true);

-- Policies untuk Tournament Brackets
drop policy if exists "Allow public select tournament_brackets" on tournament_brackets;
create policy "Allow public select tournament_brackets" on tournament_brackets for select using (true);
drop policy if exists "Allow public insert tournament_brackets" on tournament_brackets;
create policy "Allow public insert tournament_brackets" on tournament_brackets for insert with check (true);
drop policy if exists "Allow public update tournament_brackets" on tournament_brackets;
create policy "Allow public update tournament_brackets" on tournament_brackets for update using (true);
drop policy if exists "Allow public delete tournament_brackets" on tournament_brackets;
create policy "Allow public delete tournament_brackets" on tournament_brackets for delete using (true);
