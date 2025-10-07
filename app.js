// server.js
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");

  const createTable = `
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      appointment_no VARCHAR(15) UNIQUE NOT NULL,
      title VARCHAR(4) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      mobile_code VARCHAR(7) NOT NULL,
      mobile_no INT(10) NOT NULL,
      email VARCHAR(100)  NOT NULL,
      dob DATE NOT NULL,
      loan_amount VARCHAR(15) NOT NULL,
      interest INT(2) NOT NULL,
      period INT(2) NOT NULL,
      interest_amount VARCHAR(15) NOT NULL,
      total_amount VARCHAR(15) NOT NULL,
      emi VARCHAR(15) NOT NULL,
      status VARCHAR(10) NOT NULL
    )
  `;
  db.query(createTable, (err) => {
    if (err) console.error("Error creating table:", err);
    else console.log("✅ Appointments table ready");
  });
});

app.get("/appointment/:id", (req, res) => {
  db.query(
    "SELECT * FROM appointments WHERE appointment_no = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length === 0)
        return res.status(404).json({ error: "Not found" });
      res.json(result[0]);
    }
  );
});

app.get("/get-active-appointments", (req, res) => {
  db.query('SELECT * FROM users WHERE status="active"', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get("/get-finished-appointments", (req, res) => {
  db.query('SELECT * FROM users WHERE status="finished"', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get("/get-all-appointments", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/book-appointment", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, email });
    }
  );
});

app.post("/finish-appointment", (req, res) => {
  const { application_no, name, email } = req.body;
  db.query(
    `INSERT INTO users status='finished' WHERE application_no="${application_no}"`,
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, email });
    }
  );
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
