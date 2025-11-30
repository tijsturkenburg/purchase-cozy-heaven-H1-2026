// Test database connection endpoint
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const results = {
    envVars: {
      hasUrl: !!process.env.SUPABASE_URL,
      hasKey: !!process.env.SUPABASE_ANON_KEY,
      url: process.env.SUPABASE_URL || 'NOT SET'
    },
    client: null,
    tableExists: false,
    canInsert: false,
    canSelect: false,
    error: null
  };

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      results.error = 'Missing environment variables';
      return res.json(results);
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    results.client = 'created';

    // Test SELECT
    const { data: selectData, error: selectError } = await supabase
      .from('scenarios')
      .select('id')
      .limit(1);

    if (selectError) {
      results.error = selectError.message;
      results.selectError = {
        message: selectError.message,
        code: selectError.code,
        details: selectError.details,
        hint: selectError.hint
      };
    } else {
      results.canSelect = true;
      results.tableExists = true;
    }

    // Test INSERT (will rollback)
    const testName = `test_${Date.now()}`;
    const { data: insertData, error: insertError } = await supabase
      .from('scenarios')
      .insert({ name: testName, colours: { test: true } })
      .select()
      .single();

    if (insertError) {
      results.insertError = {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint
      };
    } else {
      results.canInsert = true;
      // Clean up test record
      await supabase.from('scenarios').delete().eq('id', insertData.id);
    }

    res.json(results);
  } catch (error) {
    results.error = error.message;
    res.json(results);
  }
};

