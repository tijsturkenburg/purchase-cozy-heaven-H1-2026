# Quick Fix: RLS Policy Probleem

## Het Probleem
Je tabel bestaat, maar RLS (Row Level Security) is ingeschakeld zonder policies. Dit betekent dat queries een lege array teruggeven.

## De Oplossing

### Stap 1: Open Supabase SQL Editor
1. Ga naar: https://supabase.com/dashboard/project/mgctvhqbzacekiddquez
2. Klik **"SQL Editor"** → **"New Query"**

### Stap 2: Run het Fix Script
1. Open het bestand `fix-rls-policy.sql`
2. Kopieer de hele inhoud
3. Plak in Supabase SQL Editor
4. Klik **"Run"** (Cmd/Ctrl + Enter)
5. Je zou moeten zien: Een tabel met policy informatie

### Stap 3: Verifieer
1. Ga naar **"Table Editor"** → **"scenarios"**
2. Klik op **"..."** menu → **"View Policies"**
3. Je zou moeten zien: **"Allow all operations on scenarios"**

### Stap 4: Test
1. Ga naar: `https://purchase-cozy-heaven-h1-2026.vercel.app/api/test-db`
2. Je zou moeten zien: `"canInsert": true, "canSelect": true`
3. Probeer nu een scenario op te slaan in de app!

## Alternatief: Via Supabase UI

Als je liever via de UI werkt:

1. Ga naar **"Table Editor"** → **"scenarios"**
2. Klik op **"..."** menu → **"View Policies"**
3. Klik **"New Policy"**
4. Kies **"Create a policy from scratch"**
5. Vul in:
   - **Policy name**: `Allow all operations on scenarios`
   - **Allowed operation**: `ALL`
   - **Policy definition**: `true`
   - **Policy check**: `true`
6. Klik **"Save"**

Maar het SQL script is sneller! 😊

