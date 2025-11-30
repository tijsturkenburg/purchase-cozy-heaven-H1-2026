# Deployment Guide

## Quick Deploy to Railway (Recommended)

Railway is the easiest way to deploy this app with database support.

### Step 1: Set Up Supabase Database

1. **Go to Supabase**: Visit [supabase.com](https://supabase.com) and sign up/login
2. **Create a New Project**:
   - Click "New Project"
   - Enter project name and set a database password
   - Choose a region
   - Click "Create new project"
3. **Run SQL Setup**:
   - Go to "SQL Editor" in Supabase dashboard
   - Click "New Query"
   - Copy and paste the contents of `supabase-setup.sql`
   - Click "Run" to create the scenarios table
4. **Get Credentials**:
   - Go to Project Settings → API
   - Copy: **Project URL** (SUPABASE_URL) and **anon/public key** (SUPABASE_ANON_KEY)

### Step 2: Deploy to Vercel

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign up/login
2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import from GitHub
   - Select your repository: `purchase-cozy-heaven-H1-2026`
3. **Configure**:
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     - `SUPABASE_URL` = Your Supabase Project URL
     - `SUPABASE_ANON_KEY` = Your Supabase anon/public key
   - Add for Production, Preview, and Development
5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Step 3: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Test creating a scenario
3. Check Supabase dashboard → Table Editor → `scenarios` to see your data


## Database Persistence

- **Vercel + Supabase**: Database persists in Supabase (PostgreSQL)
- **Local**: Can use Supabase or fallback to localStorage

## Troubleshooting

### Database not persisting?
- Make sure you're using a platform with persistent storage (Railway/Render)
- Check that the `data/` directory is writable

### Port issues?
- Vercel automatically handles ports for serverless functions
- No port configuration needed

### Build fails?
- Make sure all dependencies are in `package.json`
- Check that `npm run build` works locally first

## Production Checklist

- ✅ Code pushed to GitHub
- ✅ Database configured (SQLite in `data/` directory)
- ✅ Environment variables set (if needed)
- ✅ Build command: `npm run build`
- ✅ Start command: `npm start`
- ✅ Port configured: Uses `process.env.PORT`

