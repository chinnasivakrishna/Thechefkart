const express = require('express');
const { getAllUsers, createUser } = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Create a new user
router.post('/', createUser);

module.exports = router;
