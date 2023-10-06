const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const { isAdmin } = require('../middleware/isAdmin');
const { uploader } = require('cloudinary').v2;
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// Retrieve Blog page on Admin Panel
router.get('/admin/blog', isAdmin, async (req, res) => {
  const blogs = await Blog.find();
  res.render('./admin/blogView/blog', { blogs });
});
// Blog Page For User
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
  // Update Blog
  router.get('/editBlogg/:id', isAdmin, async (req, res) => {
    try {
      const bloggs = await Blog.findById(req.params.id);
      if (!bloggs) {
        req.flash('error', 'Blog not found');
        return res.redirect('/admin/blog');
      }
      res.render('./admin/blogView/editBlog', { blog: bloggs });
    } catch (error) {
      console.error('Error rendering blog update form:', error);
      req.flash('error', 'Error rendering blog update form');
      res.status(500).json({ message: 'Error rendering blog update form', error: error.message });
    }
  });
  // Update Blog
router.post('/editBlog/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { title, data } = req.body;
    const image = req.file ? req.file.path : '';

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      req.flash('error', 'Blog not found');
      return res.redirect('/admin/blog');
    }

    blog.title = title;
    blog.data = data;
    if (image) {
      blog.image = image;
    }

    await blog.save();
    req.flash('success', 'Blog updated successfully');
    res.redirect('/admin/blog');
  } catch (error) {
    console.error('Error updating blog:', error);
    req.flash('error', 'Error updating blog');
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
});

// View Single Blog
router.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      req.flash('error', 'Blog not found');
      return res.redirect('/blog'); // Redirect to the blog page if the blog is not found
    }
    
    res.render('./admin/blogView/singleBlog', { blog }); // Render a template for viewing a single blog
  } catch (error) {
    console.error('Error viewing blog:', error);
    req.flash('error', 'Error viewing blog');
    res.status(500).json({ message: 'Error viewing blog', error: error.message });
  }
});

// Delete Blog
router.post('/deleteBlog/:id', isAdmin, async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      
      // Delete the associated image from Cloudinary
      if (deletedBlog.image) {
        await uploader.destroy(deletedBlog.image);
      }
  
      req.flash('success', 'Blog deleted successfully');
      res.redirect('/admin/blog');
    } catch (error) {
      console.error('Error deleting blog:', error);
      req.flash('error', 'Error deleting blog');
      res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
  });
module.exports = router;
