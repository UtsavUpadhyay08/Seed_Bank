const { Pool } = require('pg');

const pool = new Pool({
  user: 'seeduser',
  host: 'localhost',
  database: 'seedbank',
  password: 'password',
  port: 5432,
});

module.exports = pool;