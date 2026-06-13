-- VibeCam: profiles, host applications, media uploads

create type public.application_type as enum ('organizer', 'villa_owner');
create type public.application_status as enum ('pending', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  username text unique,
  phone text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  is_organizer boolean not null default false,
  is_villa_owner boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.host_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  application_type public.application_type not null,
  status public.application_status not null default 'pending',
  business_name text not null,
  city text not null,
  phone text,
  description text,
  property_name text,
  price_per_night numeric,
  payout_phone text,
  logo_url text,
  media_urls text[] default '{}',
  reviewed_by uuid references public.profiles (id),
  reviewed_at timestamptz,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index host_applications_one_pending_per_type
  on public.host_applications (user_id, application_type)
  where status = 'pending';

create table public.media_uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  url text not null,
  public_id text not null,
  resource_type text not null check (resource_type in ('image', 'video', 'raw')),
  folder text,
  created_at timestamptz not null default now()
);

create index host_applications_status_idx on public.host_applications (status);
create index host_applications_user_idx on public.host_applications (user_id);

alter table public.profiles enable row level security;
alter table public.host_applications enable row level security;
alter table public.media_uploads enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.approve_host_application(app_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  app public.host_applications;
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;

  select * into app from public.host_applications where id = app_id for update;
  if not found then
    raise exception 'Application not found';
  end if;

  update public.host_applications
  set status = 'approved', reviewed_by = auth.uid(), reviewed_at = now(), updated_at = now()
  where id = app_id;

  if app.application_type = 'organizer' then
    update public.profiles set is_organizer = true, updated_at = now() where id = app.user_id;
  else
    update public.profiles set is_villa_owner = true, updated_at = now() where id = app.user_id;
  end if;
end;
$$;

create or replace function public.reject_host_application(app_id uuid, reason text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;

  update public.host_applications
  set
    status = 'rejected',
    rejection_reason = reason,
    reviewed_by = auth.uid(),
    reviewed_at = now(),
    updated_at = now()
  where id = app_id;
end;
$$;

-- Profiles policies
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Applications policies
create policy "Users can view own applications"
  on public.host_applications for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own applications"
  on public.host_applications for insert
  with check (auth.uid() = user_id and status = 'pending');

create policy "Admins can update applications"
  on public.host_applications for update
  using (public.is_admin());

-- Media policies
create policy "Users can view own media"
  on public.media_uploads for select using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own media"
  on public.media_uploads for insert with check (auth.uid() = user_id);
