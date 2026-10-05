-- Contact form submissions from the ALGU Co. app/website.
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) <= 320 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  organization text check (char_length(organization) <= 200),
  phone text check (char_length(phone) <= 50),
  topic text not null default 'general' check (char_length(topic) <= 100),
  message text not null check (char_length(message) between 10 and 5000),
  source text check (char_length(source) <= 50),
  status text not null default 'new'
);

alter table public.contact_submissions enable row level security;

-- Visitors may only INSERT. No select/update/delete policies exist, so
-- submissions are readable only from the Supabase dashboard or service role.
drop policy if exists "anyone can submit contact form" on public.contact_submissions;
create policy "anyone can submit contact form"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (status = 'new');
