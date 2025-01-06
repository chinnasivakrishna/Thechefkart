const db = require('../config/db');
const path = require('path');

// Get all posts
const getAllPosts = (req, res) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get all posts by a specific user
const getPostsByUser = (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM posts WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a post for a specific user (with image upload)
const createPost = (req, res) => {
  const userId = req.params.id;
  const { title, description } = req.body;
  const images = req.files.map(file => path.join('uploads', file.filename)); // Save file paths

  // Validate that the user exists
  const checkUserQuery = 'SELECT * FROM users WHERE id = ?';
  db.query(checkUserQuery, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Insert the post into the database
    const query = 'INSERT INTO posts (title, description, user_id, images) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, userId, JSON.stringify(images)], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Update the post count for the user
      const updateCountQuery = 'UPDATE users SET post_count = post_count + 1 WHERE id = ?';
      db.query(updateCountQuery, [userId], (updateErr) => {
        if (updateErr) return res.status(500).json({ error: updateErr.message });
        res.json({ message: 'Post created successfully', postId: results.insertId });
      });
    });
  });
};

// Edit a post of a specific user
const editPost = (req, res) => {
  const { userId, postId } = req.params;
  const { title, description, images } = req.body;

  // Check if the post exists
  const checkPostQuery = 'SELECT * FROM posts WHERE id = ? AND user_id = ?';
  db.query(checkPostQuery, [postId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Post not found for this user' });

    // Update the post
    const updateQuery = 'UPDATE posts SET title = ?, description = ?, images = ? WHERE id = ?';
    db.query(updateQuery, [title, description, JSON.stringify(images), postId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Post updated successfully' });
    });
  });
};

// Delete a post of a specific user
const deletePost = (req, res) => {
  const { userId, postId } = req.params;

  // Check if the post exists
  const checkPostQuery = 'SELECT * FROM posts WHERE id = ? AND user_id = ?';
  db.query(checkPostQuery, [postId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Post not found for this user' });

    // Delete the post
    const deleteQuery = 'DELETE FROM posts WHERE id = ?';
    db.query(deleteQuery, [postId], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Update the post count for the user
      const updateCountQuery = 'UPDATE users SET post_count = post_count - 1 WHERE id = ?';
      db.query(updateCountQuery, [userId], (updateErr) => {
        if (updateErr) return res.status(500).json({ error: updateErr.message });
        res.json({ message: 'Post deleted successfully' });
      });
    });
  });
};

module.exports = { getAllPosts, createPost, editPost, deletePost, getPostsByUser };
