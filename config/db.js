const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',   // Your MySQL hostname
  port: 3305,          // Your MySQL port
  user: 'root',        // Your MySQL username
  password: 'i love you amma',    // Your MySQL password
  database: 'micro_instagram', // Replace with your database name or leave as ''
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = db;
