const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize database table (run once)
const initializeDatabase = async () => {
  const { error } = await supabase.rpc('create_scenarios_table_if_not_exists');
  if (error && !error.message.includes('already exists')) {
    console.error('Error initializing database:', error);
  }
};

// Get all scenarios
const getScenarios = async () => {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

// Get scenario by ID
const getScenarioById = async (id) => {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Create scenario
const createScenario = async (name, colours) => {
  const { data, error } = await supabase
    .from('scenarios')
    .insert({
      name,
      colours: JSON.stringify(colours)
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Update scenario
const updateScenario = async (id, name, colours) => {
  const { data, error } = await supabase
    .from('scenarios')
    .update({
      name,
      colours: JSON.stringify(colours),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Delete scenario
const deleteScenario = async (id) => {
  const { error } = await supabase
    .from('scenarios')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

module.exports = {
  supabase,
  initializeDatabase,
  getScenarios,
  getScenarioById,
  createScenario,
  updateScenario,
  deleteScenario
};

