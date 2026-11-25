const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "queue.db"));
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    prefix TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS counters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    service_id INTEGER NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id)
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL,
    service_id INTEGER NOT NULL,
    counter_id INTEGER,
    priority INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'waiting',
    issued_at TEXT DEFAULT CURRENT_TIMESTAMP,
    called_at TEXT,
    finished_at TEXT,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (counter_id) REFERENCES counters(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'staff'
  );
`);

module.exports = db;
