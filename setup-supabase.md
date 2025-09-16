# Supabase Setup Guide for NIMS

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `nims`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be ready (2-3 minutes)

## Step 2: Get Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Update Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

## Step 4: Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the main schema first:

   - Copy the contents of `supabase-schema.sql`
   - Paste it in the SQL Editor
   - Click "Run"

3. Run the migration script:

   - Copy the contents of `supabase-migration.sql`
   - Paste it in the SQL Editor
   - Click "Run"

4. **Important**: Fix RLS policies to prevent login issues:
   - Copy the contents of `fix-rls-policies.sql`
   - Paste it in the SQL Editor
   - Click "Run"

## Step 5: Set Up Authentication

1. Go to **Authentication** → **Settings**
2. Configure the following:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/**`
   - **Email Auth**: Enable
   - **Email Confirmations**: Disable (for development)

## Step 6: Create Admin User

### Option A: Using Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Enter:
   - **Email**: `admin@nims.com`
   - **Password**: `admin123`
   - **Email Confirm**: Check this box
4. Click "Create user"
5. Note the user ID that gets created

### Option B: Using SQL (After creating user above)

1. Go to **SQL Editor**
2. Run this query to add the admin user to the users table:

   ```sql
   -- This will automatically get the correct user ID from auth.users
   SELECT create_admin_user();
   ```

### Alternative Method (Manual):

If the function doesn't work, run this manually:

```sql
-- First, get the user ID from auth.users
SELECT id FROM auth.users WHERE email = 'admin@nims.com';

-- Then insert into users table with the correct ID
INSERT INTO public.users (id, name, email, role, designation, created_at, updated_at)
SELECT
  id,
  'System Administrator',
  'admin@nims.com',
  'admin',
  'System Administrator',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'admin@nims.com'
ON CONFLICT (email) DO NOTHING;
```

## Step 7: Test the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Click "Login" and use:
   - **Email**: `admin@nims.com`
   - **Password**: `admin123`

## Step 8: Verify Database Setup

1. Go to **Table Editor** in Supabase
2. Check that these tables exist and have data:
   - `users` (should have admin user)
   - `courses` (should have 3 sample courses)
   - `faculty` (should have 4 sample faculty)
   - `students` (should have 10 sample students)
   - `stock_items` (should have 5 sample items)
   - `expenses` (should have 4 sample expenses)

## Troubleshooting

### Common Issues:

1. **"Invalid login credentials"**

   - Make sure the admin user was created in Supabase Auth
   - Check that the user ID in the `users` table matches the auth user ID

2. **"Row Level Security" errors**

   - Make sure you ran the migration script
   - Check that the RLS policies are properly set up

3. **"Module not found" errors**
   - Make sure you're running from the correct directory (`nims/`)
   - Check that all dependencies are installed (`npm install`)

### Getting Help:

1. Check the Supabase logs in **Logs** → **API Logs**
2. Check the browser console for client-side errors
3. Verify your environment variables are correct

## Production Deployment

When deploying to production:

1. Update the **Site URL** in Supabase Auth settings
2. Add your production domain to **Redirect URLs**
3. Update environment variables with production values
4. Consider enabling email confirmations for security

## Security Notes

- Never commit `.env.local` to version control
- Keep your service role key secret
- Use strong passwords in production
- Enable RLS policies for data protection
- Regularly update dependencies
