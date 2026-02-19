DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
  admin_role_id uuid := '61c9d395-c615-4447-b121-32800d399b77';
BEGIN
  -- Empty out existing data to remove demo stuff
  DELETE FROM work_orders;

  -- Ensure the admin role exists
  INSERT INTO roles (id, name, description, permissions)
  VALUES (
    admin_role_id,
    'ADMIN',
    'System Administrator',
    '{"all":true}'::jsonb
  ) ON CONFLICT (id) DO UPDATE SET 
    name = 'ADMIN',
    description = 'System Administrator',
    permissions = '{"all":true}'::jsonb;

  -- Delete existing admin if any
  DELETE FROM public.profiles WHERE email = 'admin@gmail.com';
  DELETE FROM auth.users WHERE email = 'admin@gmail.com';

  -- Create new admin user in auth.users
  INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      'admin@gmail.com',
      crypt('password123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now()
  );

  -- Insert profile
  INSERT INTO public.profiles (id, email, first_name, last_name, role_id)
  VALUES (new_user_id, 'admin@gmail.com', 'System', 'Administrator', admin_role_id);
END $$;
