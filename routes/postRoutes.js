const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  getPostsByUser
} = require('../controllers/postController');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/', // Directory to store the files
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Maximum file size of 10MB
});

// Get all posts
router.get('/', getAllPosts);

// Get all posts by a specific user
router.get('/user/:id', getPostsByUser);

// Create a post for a user (with image upload)
router.post('/:id', upload.array('images', 5), createPost); // Handle up to 5 images

// Edit a post of a user
router.put('/:userId/:postId', editPost);

// Delete a post of a user
router.delete('/:userId/:postId', deletePost);

module.exports = router;
