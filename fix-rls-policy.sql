-- Fix RLS Policy for scenarios table
-- Run this in Supabase SQL Editor if you're getting empty results

-- First, check if policy exists and drop it if needed
DROP POLICY IF EXISTS "Allow all operations on scenarios" ON scenarios;

-- Create the policy to allow all operations
CREATE POLICY "Allow all operations on scenarios"
  ON scenarios
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'scenarios';

