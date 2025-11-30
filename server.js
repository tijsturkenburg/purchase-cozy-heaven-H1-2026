const express = require('express');
const path = require('path');
const cors = require('cors');
const { getScenarios, getScenarioById, createScenario, updateScenario, deleteScenario, initializeDatabase } = require('./database-supabase');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from dist directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Parse JSON bodies
app.use(express.json());

// API Routes for Scenarios

// Initialize database on startup
initializeDatabase().catch(console.error);

// Get all scenarios
app.get('/api/scenarios', async (req, res) => {
  try {
    const scenarios = await getScenarios();
    const formattedScenarios = scenarios.map(scenario => ({
      id: scenario.id,
      name: scenario.name,
      colours: typeof scenario.colours === 'string' ? JSON.parse(scenario.colours) : scenario.colours,
      savedAt: scenario.created_at,
      updatedAt: scenario.updated_at
    }));
    res.json(formattedScenarios);
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    res.status(500).json({ error: 'Failed to fetch scenarios' });
  }
});

// Get a single scenario by ID
app.get('/api/scenarios/:id', async (req, res) => {
  try {
    const scenario = await getScenarioById(parseInt(req.params.id));
    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }
    res.json({
      id: scenario.id,
      name: scenario.name,
      colours: typeof scenario.colours === 'string' ? JSON.parse(scenario.colours) : scenario.colours,
      savedAt: scenario.created_at,
      updatedAt: scenario.updated_at
    });
  } catch (error) {
    console.error('Error fetching scenario:', error);
    res.status(500).json({ error: 'Failed to fetch scenario' });
  }
});

// Create a new scenario
app.post('/api/scenarios', async (req, res) => {
  try {
    const { name, colours } = req.body;
    
    if (!name || !colours) {
      return res.status(400).json({ error: 'Name and colours are required' });
    }

    const newScenario = await createScenario(name, colours);
    
    res.status(201).json({
      id: newScenario.id,
      name: newScenario.name,
      colours: typeof newScenario.colours === 'string' ? JSON.parse(newScenario.colours) : newScenario.colours,
      savedAt: newScenario.created_at,
      updatedAt: newScenario.updated_at
    });
  } catch (error) {
    console.error('Error creating scenario:', error);
    res.status(500).json({ error: 'Failed to create scenario' });
  }
});

// Update an existing scenario
app.put('/api/scenarios/:id', async (req, res) => {
  try {
    const { name, colours } = req.body;
    const id = parseInt(req.params.id);
    
    if (!name || !colours) {
      return res.status(400).json({ error: 'Name and colours are required' });
    }

    const updatedScenario = await updateScenario(id, name, colours);
    
    if (!updatedScenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    res.json({
      id: updatedScenario.id,
      name: updatedScenario.name,
      colours: typeof updatedScenario.colours === 'string' ? JSON.parse(updatedScenario.colours) : updatedScenario.colours,
      savedAt: updatedScenario.created_at,
      updatedAt: updatedScenario.updated_at
    });
  } catch (error) {
    console.error('Error updating scenario:', error);
    res.status(500).json({ error: 'Failed to update scenario' });
  }
});

// Delete a scenario
app.delete('/api/scenarios/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteScenario(id);
    res.json({ message: 'Scenario deleted successfully' });
  } catch (error) {
    console.error('Error deleting scenario:', error);
    res.status(500).json({ error: 'Failed to delete scenario' });
  }
});

// Basic API route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve index.html for all routes (SPA support) - must be last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}/dist`);
  console.log(`💾 Database: scenarios.db`);
});

