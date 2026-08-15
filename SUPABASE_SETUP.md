# SUPABASE SETUP GUIDE — SESCO STUDIO

Follow these steps exactly. The whole thing takes about 10 minutes.

---

## STEP 1 — Create a Supabase Project

1. Go to https://supabase.com and sign up / log in
2. Click **New Project**
3. Give it a name: `sesco-studio`
4. Set a strong database password (save it somewhere safe — you won't need it day-to-day but don't lose it)
5. Choose the region closest to Nigeria: **Europe West (Frankfurt)** is the nearest stable option currently
6. Click **Create New Project** and wait ~2 minutes for it to spin up

---

## STEP 2 — Create the CMS Table

Once the project is ready, go to **SQL Editor** in the left sidebar and run this SQL:

```sql
-- Single-row document table that holds the entire CMS as JSONB
create table sesco_cms (
  id          integer primary key default 1,
  content     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Only ever one row
alter table sesco_cms add constraint sesco_cms_single_row check (id = 1);

-- Seed the row so upserts work from day one
insert into sesco_cms (id, content) values (1, '{}'::jsonb)
  on conflict (id) do nothing;
```

Click **Run**. You should see "Success. No rows returned."

---

## STEP 2B — Create the Contact Form Table

Still in the SQL Editor, run this to enable the live "Start a Project" contact form (`/contact`):

```sql
-- Stores every contact form submission from the public site
create table contact_submissions (
  id          bigint generated always as identity primary key,
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  company     text,
  service     text,
  brief       text not null,
  created_at  timestamptz not null default now()
);

alter table contact_submissions enable row level security;

-- Anyone (including anonymous site visitors) can submit the form
create policy "Anyone can submit the contact form"
  on contact_submissions for insert
  with check (true);

-- Only you, logged in as admin, can read submissions
create policy "Authenticated users can read submissions"
  on contact_submissions for select
  using (auth.role() = 'authenticated');
```

Click **Run**. Submissions land in this table — view them directly in the Supabase Table Editor under `contact_submissions`, or in `/admin` → **Form Submissions**.

---

## STEP 2C — Create the Newsletter Signups Table

Powers the newsletter form in the site footer:

```sql
create table newsletter_signups (
  id          bigint generated always as identity primary key,
  email       text not null unique,
  created_at  timestamptz not null default now()
);

alter table newsletter_signups enable row level security;

create policy "Anyone can subscribe to the newsletter"
  on newsletter_signups for insert
  with check (true);

create policy "Authenticated users can read newsletter signups"
  on newsletter_signups for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete newsletter signups"
  on newsletter_signups for delete
  using (auth.role() = 'authenticated');
```

The `unique` constraint on `email` means a repeat signup gets a friendly error instead of a duplicate row.

Also add a delete policy for contact submissions, so the admin Form Submissions tab can remove entries:

```sql
create policy "Authenticated users can delete submissions"
  on contact_submissions for delete
  using (auth.role() = 'authenticated');
```

---

## STEP 2D — Roles & Permissions (RBAC)

Powers the Users & Roles tab in `/admin`. Roles are checked in the admin UI (which tabs/buttons appear) — see the note inside the Users tab about what this does and doesn't harden at the database level.

```sql
create table user_roles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('super_admin','admin','editor','author','developer','marketing')),
  created_at  timestamptz not null default now()
);

alter table user_roles enable row level security;

create policy "Users can read their own role"
  on user_roles for select
  using (auth.uid() = user_id);

-- Assigns (or updates) a role. Only a Super Admin can call this — except
-- the very first call ever, which lets a brand-new user claim Super Admin
-- for themselves so the system isn't locked with zero admins.
create or replace function assign_role(target_email text, new_role text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_count int;
  target_id uuid;
begin
  select count(*) into existing_count from user_roles;

  if existing_count = 0 then
    if target_email <> (select email from auth.users where id = auth.uid()) then
      raise exception 'First role assignment must be for your own account';
    end if;
    target_id := auth.uid();
  else
    if not exists (select 1 from user_roles where user_id = auth.uid() and role = 'super_admin') then
      raise exception 'Only Super Admins can assign roles';
    end if;
    select id into target_id from auth.users where email = target_email;
    if target_id is null then
      raise exception 'No user found with that email — create their login in Supabase Authentication first';
    end if;
  end if;

  insert into user_roles (user_id, role) values (target_id, new_role)
  on conflict (user_id) do update set role = excluded.role;
end;
$$;

grant execute on function assign_role(text, text) to authenticated;

-- Lists everyone who currently has a role. Super Admin only.
create or replace function list_admin_users()
returns table(user_id uuid, email text, role text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from user_roles where user_id = auth.uid() and role = 'super_admin') then
    raise exception 'Only Super Admins can list users';
  end if;
  return query
    select u.id, u.email::text, r.role
    from user_roles r join auth.users u on u.id = r.user_id
    order by r.role, u.email;
end;
$$;

grant execute on function list_admin_users() to authenticated;

-- Removes a user's role. Super Admin only; cannot remove your own row
-- (prevents accidentally locking yourself out).
create or replace function remove_role(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from user_roles where user_id = auth.uid() and role = 'super_admin') then
    raise exception 'Only Super Admins can remove roles';
  end if;
  if target_user_id = auth.uid() then
    raise exception 'You cannot remove your own access from here';
  end if;
  delete from user_roles where user_id = target_user_id;
end;
$$;

grant execute on function remove_role(uuid) to authenticated;
```

After running this, open `/admin` → **Users & Roles** and click **Claim Super Admin** — you'll be the first user, so this is safe and expected.

---

## STEP 3 — Set Row Level Security (RLS)

Still in the SQL Editor, run this:

```sql
-- Enable RLS on the table
alter table sesco_cms enable row level security;

-- Anyone can READ the CMS data (the public website needs this)
create policy "Public can read CMS"
  on sesco_cms for select
  using (true);

-- Only authenticated users (your admin login) can write
create policy "Authenticated users can update CMS"
  on sesco_cms for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert CMS"
  on sesco_cms for insert
  with check (auth.role() = 'authenticated');
```

Click **Run**. This means:
- Your public website can read the CMS data (services, projects, testimonials, etc.)
- Only you, logged in as an admin, can write to it

---

## STEP 4 — Create Your Admin Account

Go to **Authentication** → **Users** → **Add User** → **Create New User**

Fill in:
- Email: `sescodtech@gmail.com` (or any email you want to use)
- Password: something strong (you'll type this into the `/admin` login screen)
- Check **Auto Confirm User** so you don't need to verify the email

Click **Create User**.

---

## STEP 5 — Get Your API Keys

Go to **Settings** → **API**

You need two values:
- **Project URL** — looks like `https://abcdefghijkl.supabase.co`
- **anon / public key** — a long JWT string under "Project API keys"

---

## STEP 6 — Add Keys to Your Project

### For local development:

Create a file called `.env.local` in the root of the `sesco-studio` folder (next to `package.json`):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the placeholders with your actual values. This file is already in `.gitignore` so it will never be pushed to GitHub.

### For Vercel (production):

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add two variables:
   - Name: `NEXT_PUBLIC_SUPABASE_URL` / Value: your project URL
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` / Value: your anon key
3. Make sure both are set for **Production**, **Preview**, and **Development** environments
4. Click **Save** then **Redeploy** your project

---

## STEP 7 — Test It

### Locally:
```bash
npm run dev
```
Go to `http://localhost:3000/admin` and sign in with the email and password you created in Step 4.

### On Vercel:
Go to `https://your-project.vercel.app/admin` and sign in the same way.

Make a change in the admin (e.g. edit a service description) and click Save. Then open a private/incognito window and visit the homepage — you should see your change live.

---

## HOW IT WORKS

The whole CMS is stored as a single JSON document in the `sesco_cms` table (one row). When you save anything in the admin dashboard, the entire document is written to Supabase in one `upsert` call. The public website reads from Supabase on every page load, with the local browser cache as the instant first paint.

This design keeps the code extremely simple — no complex relational queries, no joins, no migrations when you add a new field.

---

## TROUBLESHOOTING

**"relation sesco_cms does not exist"**
You skipped Step 2. Run the SQL in the editor.

**"new row violates row-level security policy"**
You are not authenticated. Make sure you are signed into `/admin` before saving. Also double-check that you ran the RLS policies in Step 3.

**"Invalid login credentials"**
Wrong email or password. Go back to Supabase → Authentication → Users and reset the password there.

**Environment variables not loading on Vercel**
After adding variables in Vercel settings you must trigger a new deployment for them to take effect. Go to Deployments → click the three-dot menu on the latest deployment → Redeploy.

**Changes I make in admin are not showing on the live site**
The public site fetches from Supabase on load. Hard-refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) the page in a new incognito window. If changes still don't show, verify that the RLS "Public can read CMS" policy was created (Step 3).
