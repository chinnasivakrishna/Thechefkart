const db = require('../config/db');

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(256),
  mobile_number BIGINT UNIQUE,
  address TEXT,
  post_count INT DEFAULT 0
)`;

db.query(createUserTable, (err) => {
  if (err) throw err;
  console.log('Users table ready');
});

module.exports = {};