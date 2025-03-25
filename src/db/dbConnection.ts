const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export { pool };
