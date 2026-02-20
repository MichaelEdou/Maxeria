-- 1. Create the user in auth.users (requires superuser or dash access usually, but for local/seed we use admin auth)
-- Since I cannot 'add' a user to auth.users via simple REST, 
-- I will provide the script for the SQL Editor which is the safest way to ensure GoTrue metadata.

/* 
  COPY AND RUN THIS IN YOUR SUPABASE SQL EDITOR: 
  https://supabase.com/dashboard/project/lchdeqaoutulabmpqbmf/sql/new
*/

-- Step 1: Create the Auth User
-- (Note: In a real app, this is done via supabase.auth.signUp)
-- For manual creation in SQL Editor:
DO $$
DECLARE
  new_userId UUID := uuid_generate_v4();
BEGIN
  -- Insert into auth.users
  INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
  VALUES (
    new_userId,
    '00000000-0000-0000-0000-000000000000',
    'michael.edou@maxeria.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"first_name":"Michael","last_name":"Edou"}',
    'authenticated',
    'authenticated'
  );

  -- Step 2: Create the Public Profile linked to the Technician Role
  INSERT INTO public.profiles (id, first_name, last_name, initials, role_id)
  VALUES (
    new_userId,
    'Michael',
    'Edou',
    'ME',
    '067cdf7c-68c7-40de-a7b0-a9b4df9d24a3' -- TECHNICIAN Role ID
  );
END $$;
