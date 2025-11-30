# Database Setup - Stap voor Stap

## ✅ Stap 1: Open Supabase SQL Editor

1. Ga naar: https://supabase.com/dashboard/project/mgctvhqbzacekiddquez
2. Klik op **"SQL Editor"** in de linker sidebar
3. Klik op **"New Query"** (of gebruik de bestaande query editor)

## ✅ Stap 2: Kopieer en Plak SQL Script

1. Open het bestand `supabase-setup.sql` in je editor
2. **Selecteer ALLES** (Cmd/Ctrl + A)
3. **Kopieer** (Cmd/Ctrl + C)
4. **Plak** in de Supabase SQL Editor

## ✅ Stap 3: Run het Script

1. Klik op **"Run"** knop (of druk Cmd/Ctrl + Enter)
2. Je zou moeten zien: **"Success. No rows returned"**
3. Dit betekent dat de tabel is aangemaakt!

## ✅ Stap 4: Verifieer de Tabel

1. Klik op **"Table Editor"** in de linker sidebar
2. Je zou de **"scenarios"** tabel moeten zien
3. Klik erop om de structuur te bekijken:
   - `id` (bigint, primary key)
   - `name` (text)
   - `colours` (jsonb)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## ✅ Stap 5: Controleer RLS Policies

1. In **"Table Editor"** → klik op **"scenarios"** tabel
2. Klik op **"..."** menu → **"View Policies"**
3. Je zou moeten zien: **"Allow all operations on scenarios"**
4. Als deze ontbreekt, run het SQL script opnieuw

## ⚠️ Belangrijk

**Je hoeft GEEN directe PostgreSQL connectie te maken!**

De applicatie gebruikt Supabase's REST API (via JavaScript client), niet directe PostgreSQL connecties. De connection string die je ziet is alleen nodig als je:
- Direct met een database tool (zoals pgAdmin) wilt verbinden
- Handmatig SQL queries wilt uitvoeren buiten de Supabase dashboard

Voor onze applicatie is dit **niet nodig** - gebruik gewoon de Supabase SQL Editor zoals hierboven beschreven.

## Test na Setup

Na het runnen van het script, test de applicatie:
1. Ga naar: `https://purchase-cozy-heaven-h1-2026.vercel.app/api/test-db`
2. Je zou moeten zien: `"tableExists": true, "canInsert": true`

Als dit werkt, probeer dan een scenario op te slaan in de applicatie!

