const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create/connect to database
const dbPath = path.join(dataDir, 'scenarios.db');
const db = new Database(dbPath);

// Create scenarios table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS scenarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    colours TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create index on name for faster searches
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_scenarios_name ON scenarios(name)
`);

// Helper function to prepare statements
const getScenarios = db.prepare('SELECT * FROM scenarios ORDER BY updated_at DESC');
const getScenarioById = db.prepare('SELECT * FROM scenarios WHERE id = ?');
const createScenario = db.prepare('INSERT INTO scenarios (name, colours) VALUES (?, ?)');
const updateScenario = db.prepare('UPDATE scenarios SET name = ?, colours = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
const deleteScenario = db.prepare('DELETE FROM scenarios WHERE id = ?');

module.exports = {
  db,
  getScenarios,
  getScenarioById,
  createScenario,
  updateScenario,
  deleteScenario
};

