import pool from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO users (email) VALUES ($1) RETURNING *",
        [email]
      );

      res.status(200).json({ message: "Thank you for signing up!", user: result.rows[0] });
    } catch (error) {
      if (error.code === "23505") {
        // Handle unique constraint violation (email already exists)
        res.status(400).json({ error: "This email is already on the waitlist." });
      } else {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
