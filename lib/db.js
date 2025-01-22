import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // This reads the database URL from .env.local
});

export default pool;
