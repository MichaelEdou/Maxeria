# How to Fix the Supabase Login 500 Error & Invalid Credentials

Because we previously ran a raw SQL script (`setup_admin.sql`) that manually inserted a user directly into the `auth.users` table using `crypt()`, Supabase's authentication engine (GoTrue) doesn't know how to handle it. This missing internal metadata is causing the **500 Database error querying schema** and the **400 Invalid Credentials** errors when you try to sign in via the browser.

To fix both your local environment and Vercel (which share the same database), you **MUST** recreate the user through the Supabase Dashboard, not via raw SQL.

## Step 1: Wipe the Corrupted User completely
Open your Supabase SQL Editor here:
👉 **[Supabase Project SQL Editor](https://supabase.com/dashboard/project/lchdeqaoutulabmpqbmf/sql/new)**

Run this exact SQL snippet to completely purge the corrupted admin:
```sql
DO $$
BEGIN
    DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email = 'admin@gmail.com');
    DELETE FROM auth.identities WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'admin@gmail.com');
    DELETE FROM auth.users WHERE email = 'admin@gmail.com';
END $$;
```

## Step 2: Create the Clean User properly
1. Go to your **[Supabase Authentication Users Page](https://supabase.com/dashboard/project/lchdeqaoutulabmpqbmf/auth/users)**.
2. Click the green **"Add user"** button -> **"Create new user"**.
3. Type **Email:** `admin@gmail.com`
4. Type **Password:** `password123`
5. Ensure **"Auto Confirm User"** is CHECKED.
6. Click **Create User**.

## Step 3: Link the User to the ADMIN role
Now the user cleanly exists, we just need to assign them the `ADMIN` role in our custom `profiles` table so they have permissions to create Work Orders.

Go back to your **[SQL Editor](https://supabase.com/dashboard/project/lchdeqaoutulabmpqbmf/sql/new)** and run this final script:
```sql
INSERT INTO public.profiles (id, first_name, last_name, role_id)
SELECT id, 'System', 'Admin', (SELECT id FROM roles WHERE name = 'ADMIN')
FROM auth.users
WHERE email = 'admin@gmail.com'
ON CONFLICT (id) DO UPDATE 
SET first_name = EXCLUDED.first_name, 
    last_name = EXCLUDED.last_name, 
    role_id = EXCLUDED.role_id;
```

---

That's it! 
Now go back to `http://localhost:3000/login` and sign in. You will smoothly authenticate, be redirected to the Dashboard, and you'll be able to create Work Orders locally and on Vercel without any 401 or 500 API errors!
