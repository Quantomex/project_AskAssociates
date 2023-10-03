const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const { isAdmin } = require('../middleware/isAdmin');
const { uploader } = require('cloudinary').v2;
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// Create Blog Page
router.get('/admin/blog', isAdmin, async (req, res) => {
  const blogs = await Blog.find();
  res.render('./admin/blogView/blog', { blogs });
});
router.get('/blog', async (req, res) => {
  const blogs = await Blog.find(); // Fetch the blogs
  res.render('./otherpages/blog', { blogs }); // Pass the blogs with the variable name 'blogs'
});
// Create Blog
router.post('/admin/blog/create', upload.single('image'), isAdmin, async (req, res) => {
    try {
      const { title, data } = req.body;
      const image = req.file ? req.file.path : ''; 
      const blog = new Blog({ title, data, image });
      await blog.save();
      req.flash('success', 'Blog created successfully');
      res.redirect('/admin/blog');
    } catch (error) {
      console.error('Error creating blog:', error);
      req.flash('error', 'Error creating blog');
      res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
  });

// Delete Blog
router.post('/deleteBlog/:id', isAdmin, async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      
      // // Delete the associated image from Cloudinary
      // if (deletedBlog.image) {
      //   await uploader.destroy(deletedBlog.image);
      // }
  
      req.flash('success', 'Blog deleted successfully');
      res.redirect('/admin/blog');
    } catch (error) {
      console.error('Error deleting blog:', error);
      req.flash('error', 'Error deleting blog');
      res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
  });
module.exports = router;
