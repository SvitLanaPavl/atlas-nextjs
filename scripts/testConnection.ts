const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Disable SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log("Postgres URL:", process.env.POSTGRES_URL);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use your POSTGRES_URL
  ssl: {
    rejectUnauthorized: false, // Disable strict SSL verification
  },
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    
    const result = await client.query('SELECT NOW()');
    console.log('Current Time:', result.rows[0].now);
    client.release();
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testConnection();
