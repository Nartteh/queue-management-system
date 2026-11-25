const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Queue system is running" });
});

app.get("/api/db-test", (req, res) => {
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
    .all();
  res.json(tables);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});