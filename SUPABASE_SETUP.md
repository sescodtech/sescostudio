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
    if not exists (select 1 from user_roles ur where ur.user_id = auth.uid() and ur.role = 'super_admin') then
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
  if not exists (select 1 from user_roles ur where ur.user_id = auth.uid() and ur.role = 'super_admin') then
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
  if not exists (select 1 from user_roles ur where ur.user_id = auth.uid() and ur.role = 'super_admin') then
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

## STEP 3 — Database-Level RBAC Hardening

Everything up to Step 2D checks roles in the *admin UI* only — any authenticated account could still write directly to Supabase, bypassing the UI. This step makes Postgres itself the security boundary, mirroring the exact role → capability matrix in `lib/permissions.ts`. **Run Step 2D and claim Super Admin (in `/admin` → Users & Roles) before running this** — otherwise your own next CMS save will be rejected until you have a role.

### 3.1 — Enable RLS and confirm public read access

```sql
alter table sesco_cms enable row level security;

drop policy if exists "Public can read CMS" on sesco_cms;
create policy "Public can read CMS"
  on sesco_cms for select
  using (true);
```

If you already ran the original Step 3 from an earlier version of this guide, this is safe to re-run — it just re-confirms the same public-read policy under the same name.

### 3.2 — Role lookup helper

```sql
create or replace function get_my_role()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select role from user_roles where user_id = auth.uid();
$$;

grant execute on function get_my_role() to authenticated;
```

### 3.3 — Replace the coarse `sesco_cms` write policies

```sql
drop policy if exists "Authenticated users can update CMS" on sesco_cms;
drop policy if exists "Authenticated users can insert CMS" on sesco_cms;

-- Public read is untouched — the live site still needs it.
-- Writes now require an assigned role; the trigger below enforces which
-- JSON sections that role may actually change.
create policy "Roled users can update CMS"
  on sesco_cms for update
  using (get_my_role() is not null)
  with check (get_my_role() is not null);

create policy "Roled users can insert CMS"
  on sesco_cms for insert
  with check (get_my_role() is not null);
```

### 3.4 — Field-level enforcement trigger

`sesco_cms` is one JSON document, so per-section permissions (e.g. Editor can touch `services` but not `navigation`) can't be expressed as row-level policies alone — this trigger inspects exactly which top-level keys changed on every UPDATE and rejects anything outside what that role is allowed to touch, matching `lib/permissions.ts` capability-for-capability. If you ever change the matrix in code, mirror the change here too — this is intentionally the same rule set, not a second one.

```sql
create or replace function enforce_cms_write_permissions()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  my_role text;
  my_email text;
  changed_keys text[];
  changed_key text;
  editor_keys text[] := array['heroHeadline','heroSub','about','contact','logo','favicon','services','projects','testimonials','faq','team','media'];
  admin_keys  text[] := array['heroHeadline','heroSub','about','contact','logo','favicon','services','projects','testimonials','faq','team','media','navigation','footer','blogPosts'];
  old_blog jsonb; new_blog jsonb; old_post jsonb; new_post jsonb; i int;
begin
  -- The Supabase Table Editor / SQL Editor connect as the 'postgres'
  -- superuser directly; a backend using the service-role key sends a JWT
  -- with role 'service_role'. Both are legitimate and must bypass these
  -- checks. Note: current_user is NOT used here — inside a SECURITY
  -- DEFINER function, current_user always reflects the function's owner,
  -- not the real caller, so it cannot be used to detect who's actually
  -- connected. session_user is unaffected by SECURITY DEFINER and safely
  -- identifies a genuine postgres superuser session.
  if session_user = 'postgres' or auth.role() = 'service_role' then
    return new;
  end if;

  my_role := get_my_role();

  if my_role = 'super_admin' then
    return new; -- full access, matches ALL in lib/permissions.ts
  end if;

  if my_role is null then
    raise exception 'You do not have permission to edit site content — ask a Super Admin to assign you a role';
  end if;

  select array_agg(key_name) into changed_keys
  from (
    select jsonb_object_keys(old.content) as key_name
    union
    select jsonb_object_keys(new.content) as key_name
  ) keys
  where old.content -> key_name is distinct from new.content -> key_name;

  if my_role = 'admin' then
    foreach changed_key in array coalesce(changed_keys, array[]::text[]) loop
      if not (changed_key = any(admin_keys)) then
        raise exception 'Admins cannot modify "%" — that requires Super Admin (matches manage_seo/manage_settings being outside the Admin capability set)', changed_key;
      end if;
    end loop;
    return new;

  elsif my_role = 'editor' then
    foreach changed_key in array coalesce(changed_keys, array[]::text[]) loop
      if not (changed_key = any(editor_keys)) then
        raise exception 'Editors cannot modify "%"', changed_key;
      end if;
    end loop;
    -- editor lacks manage_media_delete: media may only grow, never lose or alter an existing entry
    if 'media' = any(changed_keys) and not ((new.content->'media') @> (old.content->'media')) then
      raise exception 'Editors can upload media but cannot delete or replace existing files';
    end if;
    return new;

  elsif my_role = 'author' then
    my_email := (select email from auth.users where id = auth.uid());
    foreach changed_key in array coalesce(changed_keys, array[]::text[]) loop
      if changed_key not in ('blogPosts','media') then
        raise exception 'Authors can only modify blog posts and upload blog images';
      end if;
    end loop;
    if 'media' = any(changed_keys) and not ((new.content->'media') @> (old.content->'media')) then
      raise exception 'Authors cannot delete or replace existing media files';
    end if;

    old_blog := coalesce(old.content -> 'blogPosts', '[]'::jsonb);
    new_blog := coalesce(new.content -> 'blogPosts', '[]'::jsonb);
    for i in 0 .. jsonb_array_length(new_blog) - 1 loop
      new_post := new_blog -> i;
      select p into old_post from jsonb_array_elements(old_blog) p where (p->>'id') = (new_post->>'id');
      if old_post is distinct from new_post and (new_post->>'authorEmail') is distinct from my_email then
        raise exception 'Authors can only modify their own blog posts';
      end if;
    end loop;
    for i in 0 .. jsonb_array_length(old_blog) - 1 loop
      old_post := old_blog -> i;
      select p into new_post from jsonb_array_elements(new_blog) p where (p->>'id') = (old_post->>'id');
      if new_post is null then
        raise exception 'Authors cannot delete blog posts — ask an Admin or Super Admin';
      end if;
    end loop;
    return new;

  elsif my_role = 'developer' then
    foreach changed_key in array coalesce(changed_keys, array[]::text[]) loop
      if changed_key <> 'siteSettings' then
        raise exception 'Developers can only toggle Maintenance Mode';
      end if;
    end loop;
    if (old.content->'siteSettings'->>'ga4Id')     is distinct from (new.content->'siteSettings'->>'ga4Id')
    or (old.content->'siteSettings'->>'gtmId')     is distinct from (new.content->'siteSettings'->>'gtmId')
    or (old.content->'siteSettings'->>'clarityId') is distinct from (new.content->'siteSettings'->>'clarityId') then
      raise exception 'Developers cannot modify analytics settings — that requires Marketing or Super Admin';
    end if;
    return new;

  elsif my_role = 'marketing' then
    foreach changed_key in array coalesce(changed_keys, array[]::text[]) loop
      if changed_key not in ('seo','siteSettings') then
        raise exception 'Marketing can only modify SEO and analytics settings';
      end if;
    end loop;
    if (old.content->'siteSettings'->>'maintenanceMode')    is distinct from (new.content->'siteSettings'->>'maintenanceMode')
    or (old.content->'siteSettings'->>'maintenanceMessage') is distinct from (new.content->'siteSettings'->>'maintenanceMessage') then
      raise exception 'Marketing cannot modify Maintenance Mode — that requires Developer or Super Admin';
    end if;
    return new;

  else
    raise exception 'Your role does not permit editing site content';
  end if;
end;
$$;

drop trigger if exists trg_enforce_cms_write on sesco_cms;
create trigger trg_enforce_cms_write
  before update on sesco_cms
  for each row execute function enforce_cms_write_permissions();
```

### 3.5 — Harden submissions and newsletter tables

Only roles with `view_submissions`/`manage_newsletters` (Super Admin, Admin, Marketing) can read; only Super Admin can delete (matches `delete_submissions` being Super-Admin-only in `lib/permissions.ts`):

```sql
drop policy if exists "Authenticated users can read submissions" on contact_submissions;
drop policy if exists "Authenticated users can delete submissions" on contact_submissions;

create policy "Authorized roles can read submissions"
  on contact_submissions for select
  using (get_my_role() in ('super_admin','admin','marketing'));

create policy "Only Super Admin can delete submissions"
  on contact_submissions for delete
  using (get_my_role() = 'super_admin');

drop policy if exists "Authenticated users can read newsletter signups" on newsletter_signups;
drop policy if exists "Authenticated users can delete newsletter signups" on newsletter_signups;

create policy "Authorized roles can read newsletter signups"
  on newsletter_signups for select
  using (get_my_role() in ('super_admin','admin','marketing'));

create policy "Only Super Admin can delete newsletter signups"
  on newsletter_signups for delete
  using (get_my_role() = 'super_admin');
```

The public "Anyone can submit the contact form" / "Anyone can subscribe to the newsletter" insert policies from Steps 2B/2C are untouched — visitors can still submit the form and newsletter without logging in, exactly as before.

### 3.6 — `user_roles` itself

No changes needed — it already only allows `select` of your own row, and every write goes through the `security definer` RPC functions from Step 2D, which check the caller's role internally before touching the table. There is no direct insert/update/delete policy on `user_roles` for any client, which is intentional: with RLS enabled and no matching policy, Postgres denies by default.

### What this does and doesn't cover

This hardens `sesco_cms`, `contact_submissions`, `newsletter_signups`, and `user_roles` — every admin-controlled table in this project. It does **not** touch your Supabase Auth login itself (email/password) or grant/require any service-role key in the browser — the anon key remains the only credential shipped client-side, exactly as before.

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
