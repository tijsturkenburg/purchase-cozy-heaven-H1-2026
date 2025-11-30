# Supabase API Keys Setup

## Your Supabase Project
**Project URL**: https://mgctvhqbzacekiddquez.supabase.co

## Finding Your Supabase API Keys

The keys you provided look like Stripe keys. Supabase uses JWT tokens instead.

### To find your Supabase keys:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/mgctvhqbzacekiddquez
2. **Click "Settings"** (gear icon) in the left sidebar
3. **Click "API"** under Project Settings
4. **Look for these keys:**

   - **Project URL**: `https://mgctvhqbzacekiddquez.supabase.co` ✅ (you have this)
   
   - **anon public** key: Should look like:
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nY3R2aHFiemFjZWtpZGRxdWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNDgwMDAsImV4cCI6MjA0ODYyNDAwMH0.xxxxx
     ```
     (This is a JWT token - long string starting with `eyJ`)
   
   - **service_role** key: Also a JWT token (don't use this one - it's for admin operations)

### What You Need for Vercel:

- **SUPABASE_URL**: `https://mgctvhqbzacekiddquez.supabase.co`
- **SUPABASE_ANON_KEY**: The `anon` `public` key (JWT token starting with `eyJ`)

## Adding to Vercel

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   - Name: `SUPABASE_URL`
   - Value: `https://mgctvhqbzacekiddquez.supabase.co`
   - Environments: Production, Preview, Development
4. Add:
   - Name: `SUPABASE_ANON_KEY`
   - Value: (paste the anon public JWT token)
   - Environments: Production, Preview, Development
5. Redeploy

## Note

The keys you provided (`sb_secret_` and `sb_publishable_`) look like Stripe keys, not Supabase keys. 
Supabase uses JWT tokens for authentication. Please check your Supabase dashboard → Settings → API to find the correct keys.

