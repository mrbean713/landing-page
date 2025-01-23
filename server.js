import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "nicksobhanian",
  host: "localhost",
  database: "landing_page_db",
  password: "nickyas12",
  port: 5432,
});

// API to handle email submissions
app.post("/submit-email", async (req, res) => {
  const { email } = req.body;

  try {
    // Insert into the 'users' table
    const result = await pool.query(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
      [email]
    );
    res.status(200).json({ message: "Email saved successfully!", user: result.rows[0] });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ error: "Failed to save email" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
