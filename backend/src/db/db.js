// db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({path: './.env', quiet: true});
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

export default pool;
