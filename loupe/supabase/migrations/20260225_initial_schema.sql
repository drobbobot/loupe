-- ─────────────────────────────────────────────────────────────────────────────
-- Loupe — Initial Database Schema
-- Run via: Supabase dashboard SQL editor, or `npx supabase db push`
-- Matches architecture.md §4 Data Models exactly.
-- All tables have RLS enabled. Users can only access their own records.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Extensions ────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── users ─────────────────────────────────────────────────────────────────────
-- Extends Supabase auth.users with product-specific fields.
-- Row is created automatically via trigger when a user signs up.

create table public.users (
  id                  uuid        not null references auth.users(id) on delete cascade,
  email               text        not null,
  created_at          timestamptz not null default now(),
  subscription_status text        not null default 'free'
                                  check (subscription_status in ('free', 'trial', 'active', 'cancelled')),
  trial_started_at    timestamptz,
  trial_ends_at       timestamptz,
  stripe_customer_id  text,

  primary key (id)
);

-- Auto-create a users row when someone signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, subscription_status, trial_started_at, trial_ends_at)
  values (
    new.id,
    new.email,
    'trial',                         -- all new accounts start on trial
    now(),
    now() + interval '21 days'       -- 3-week trial (prd.md §7)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.users enable row level security;

create policy "Users can view their own record"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own record"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── assessment_results ────────────────────────────────────────────────────────
-- One record per completed assessment. Immutable after creation (RLS enforces this).
-- Raw scores per lens are NOT stored — only the portrait result.

create table public.assessment_results (
  id                  uuid        not null default uuid_generate_v4(),
  user_id             uuid        not null references public.users(id) on delete cascade,
  completed_at        timestamptz not null default now(),

  -- Raw responses stored for potential future re-scoring
  -- Shape: [{question_id: string, response_value: any, input_type: string}]
  responses           jsonb       not null default '[]',

  -- Result portrait (from architecture.md §4)
  primary_lens        text        not null
                                  check (primary_lens in ('beige','purple','red','blue','orange','green','yellow','turquoise')),
  secondary_lens      text        not null
                                  check (secondary_lens in ('beige','purple','red','blue','orange','green','yellow','turquoise')),
  shadow_flags        jsonb       not null default '{"tendencies": [], "triggers": []}',
  growth_orientation  text,

  -- Internal quality flags — not shown to user
  confidence_level    text        not null default 'medium'
                                  check (confidence_level in ('high', 'medium', 'low')),
  inflation_flag      boolean     not null default false,

  primary key (id)
);

-- RLS — insert-only for users (cannot modify own results after creation)
alter table public.assessment_results enable row level security;

create policy "Users can view their own results"
  on public.assessment_results for select
  using (auth.uid() = user_id);

create policy "Users can insert their own results"
  on public.assessment_results for insert
  with check (auth.uid() = user_id);

-- No update or delete policy for users — results are immutable
-- Service role key (server-side only) can update if needed

-- ── subscriptions ─────────────────────────────────────────────────────────────
-- Mirrors Stripe subscription state. Updated exclusively by Stripe webhooks.

create table public.subscriptions (
  id                      uuid        not null default uuid_generate_v4(),
  user_id                 uuid        not null references public.users(id) on delete cascade,
  stripe_subscription_id  text        not null unique,
  stripe_price_id         text        not null,
  status                  text        not null,   -- Stripe subscription statuses
  current_period_start    timestamptz not null,
  current_period_end      timestamptz not null,
  cancel_at_period_end    boolean     not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  primary key (id)
);

alter table public.subscriptions enable row level security;

create policy "Users can view their own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Subscriptions are written only by server-side webhook handler (service role)
-- No user insert/update policies

-- ── lens_saves ────────────────────────────────────────────────────────────────
-- User's saved/bookmarked lens profiles.

create table public.lens_saves (
  id          uuid        not null default uuid_generate_v4(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  lens_slug   text        not null
                          check (lens_slug in ('beige','purple','red','blue','orange','green','yellow','turquoise')),
  saved_at    timestamptz not null default now(),

  primary key (id),
  unique (user_id, lens_slug)   -- can only save a lens once
);

alter table public.lens_saves enable row level security;

create policy "Users can manage their own lens saves"
  on public.lens_saves for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── relationship_saves ────────────────────────────────────────────────────────
-- User's saved two-lens combination guides.

create table public.relationship_saves (
  id          uuid        not null default uuid_generate_v4(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  lens_a      text        not null
                          check (lens_a in ('beige','purple','red','blue','orange','green','yellow','turquoise')),
  lens_b      text        not null
                          check (lens_b in ('beige','purple','red','blue','orange','green','yellow','turquoise')),
  scenario    text        not null default 'close'
                          check (scenario in ('close', 'work', 'civic')),
  saved_at    timestamptz not null default now(),

  primary key (id),
  unique (user_id, lens_a, lens_b, scenario)
);

alter table public.relationship_saves enable row level security;

create policy "Users can manage their own relationship saves"
  on public.relationship_saves for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── Indexes ───────────────────────────────────────────────────────────────────

create index idx_assessment_results_user_id
  on public.assessment_results(user_id);

create index idx_assessment_results_completed_at
  on public.assessment_results(completed_at desc);

create index idx_subscriptions_user_id
  on public.subscriptions(user_id);

create index idx_subscriptions_stripe_id
  on public.subscriptions(stripe_subscription_id);

create index idx_lens_saves_user_id
  on public.lens_saves(user_id);

create index idx_relationship_saves_user_id
  on public.relationship_saves(user_id);

-- ── Scheduled job: expire trials ─────────────────────────────────────────────
-- Sets subscription_status = 'free' for users whose trial has ended
-- and who don't have an active Stripe subscription.
-- Run this as a Supabase scheduled function (cron) daily.

create or replace function public.expire_trials()
returns void
language plpgsql
security definer
as $$
begin
  update public.users
  set subscription_status = 'free'
  where
    subscription_status = 'trial'
    and trial_ends_at < now()
    and id not in (
      select user_id from public.subscriptions
      where status in ('active', 'trialing')
    );
end;
$$;

-- Schedule via Supabase dashboard: Database → Extensions → pg_cron
-- or add to your Supabase Edge Function schedule:
-- select cron.schedule('expire-trials', '0 2 * * *', 'select public.expire_trials()');
