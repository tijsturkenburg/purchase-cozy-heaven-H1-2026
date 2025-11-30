-- Create scenarios table in Supabase
CREATE TABLE IF NOT EXISTS scenarios (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  colours JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on name for faster searches
CREATE INDEX IF NOT EXISTS idx_scenarios_name ON scenarios(name);

-- Create index on updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_scenarios_updated_at ON scenarios(updated_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_scenarios_updated_at ON scenarios;
CREATE TRIGGER update_scenarios_updated_at
  BEFORE UPDATE ON scenarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional - adjust based on your needs)
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations (adjust based on your security needs)
CREATE POLICY "Allow all operations on scenarios"
  ON scenarios
  FOR ALL
  USING (true)
  WITH CHECK (true);

