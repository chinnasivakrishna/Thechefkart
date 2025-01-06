const db = require('../config/db');

// Get all users
const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a new user
const createUser = (req, res) => {
  const { name, mobile_number, address } = req.body;

  // Insert new user into the database
  const query = 'INSERT INTO users (name, mobile_number, address) VALUES (?, ?, ?)';
  db.query(query, [name, mobile_number, address], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
};

module.exports = { getAllUsers, createUser };
