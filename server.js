const express = require('express');
const path = require('path');
const cors = require('cors');
const { getScenarios, getScenarioById, createScenario, updateScenario, deleteScenario } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from dist directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Parse JSON bodies
app.use(express.json());

// API Routes for Scenarios

// Get all scenarios
app.get('/api/scenarios', (req, res) => {
  try {
    const scenarios = getScenarios.all();
    const formattedScenarios = scenarios.map(scenario => ({
      id: scenario.id,
      name: scenario.name,
      colours: JSON.parse(scenario.colours),
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
app.get('/api/scenarios/:id', (req, res) => {
  try {
    const scenario = getScenarioById.get(parseInt(req.params.id));
    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }
    res.json({
      id: scenario.id,
      name: scenario.name,
      colours: JSON.parse(scenario.colours),
      savedAt: scenario.created_at,
      updatedAt: scenario.updated_at
    });
  } catch (error) {
    console.error('Error fetching scenario:', error);
    res.status(500).json({ error: 'Failed to fetch scenario' });
  }
});

// Create a new scenario
app.post('/api/scenarios', (req, res) => {
  try {
    const { name, colours } = req.body;
    
    if (!name || !colours) {
      return res.status(400).json({ error: 'Name and colours are required' });
    }

    const result = createScenario.run(name, JSON.stringify(colours));
    const newScenario = getScenarioById.get(result.lastInsertRowid);
    
    res.status(201).json({
      id: newScenario.id,
      name: newScenario.name,
      colours: JSON.parse(newScenario.colours),
      savedAt: newScenario.created_at,
      updatedAt: newScenario.updated_at
    });
  } catch (error) {
    console.error('Error creating scenario:', error);
    res.status(500).json({ error: 'Failed to create scenario' });
  }
});

// Update an existing scenario
app.put('/api/scenarios/:id', (req, res) => {
  try {
    const { name, colours } = req.body;
    const id = parseInt(req.params.id);
    
    if (!name || !colours) {
      return res.status(400).json({ error: 'Name and colours are required' });
    }

    const result = updateScenario.run(name, JSON.stringify(colours), id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    const updatedScenario = getScenarioById.get(id);
    res.json({
      id: updatedScenario.id,
      name: updatedScenario.name,
      colours: JSON.parse(updatedScenario.colours),
      savedAt: updatedScenario.created_at,
      updatedAt: updatedScenario.updated_at
    });
  } catch (error) {
    console.error('Error updating scenario:', error);
    res.status(500).json({ error: 'Failed to update scenario' });
  }
});

// Delete a scenario
app.delete('/api/scenarios/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = deleteScenario.run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

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

