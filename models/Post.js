const db = require('../config/db');

const createPostTable = `CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT,
  description TEXT,
  user_id INT,
  images JSON,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.query(createPostTable, (err) => {
  if (err) throw err;
  console.log('Posts table ready');
});

module.exports = {};

