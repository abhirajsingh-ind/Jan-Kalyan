const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  // Schemes Table
  db.run(`CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT,
    state TEXT,
    category TEXT,
    icon TEXT,
    link TEXT
  )`);

  // Scholarships Table
  db.run(`CREATE TABLE IF NOT EXISTS scholarships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount TEXT,
    status TEXT,
    deadline TEXT,
    institution TEXT,
    level TEXT,
    category TEXT,
    icon TEXT
  )`);

  // Fellowships Table
  db.run(`CREATE TABLE IF NOT EXISTS fellowships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount TEXT,
    duration TEXT,
    institution TEXT,
    level TEXT,
    type TEXT,
    deadline TEXT
  )`);

  // News Table
  db.run(`CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT,
    badge TEXT,
    icon TEXT
  )`);
});

module.exports = db;
