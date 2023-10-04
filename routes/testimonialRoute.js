const express = require('express');
const router = express.Router();
const Test = require('../models/testModel');
const { isAdmin } = require('../middleware/isAdmin');
const { uploader } = require('cloudinary').v2;
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
// Get Testimonials Page
router.get('/admin/testimonials', isAdmin, async (req, res) => {
  const t = await Test.find();
  res.render('./admin/testimonialView/testimonials', { t });
});
// Create Testimonial
router.post('/addTestimonial', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const image = req.file ? req.file.path : '';
    const tms = new Test({ image, name, title, description });
    await tms.save();
    req.flash('success', 'Testimonial added successfully');
    res.redirect('/admin/testimonials');
  } catch (error) {
    console.error('Error adding Testimonial:', error);
    req.flash('error', 'Error adding Testimonial');
    res.status(500).json({ message: 'Error adding Testimonial', error: error.message });
  }
});

// Edit Testimonial Form
router.get('/editTestimonial/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Test.findById(id);

    if (!testimonial) {
      req.flash('error', 'Testimonial not found');
      return res.redirect('/admin/testimonials');
    }

    res.render('./admin/testimonialView/editTestimonial', { testimonial });
  } catch (error) {
    console.error('Error retrieving Testimonial:', error);
    res.status(500).json({ message: 'Error retrieving Testimonial', error: error.message });
  }
});

// Update Testimonial
router.post('/editTestimonial/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Test.findById(id);

    if (!testimonial) {
      req.flash('error', 'Testimonial not found');
      return res.redirect('/admin/testimonials');
    }

    testimonial.image = req.file ? req.file.path : ''; // Update the image path
    testimonial.name = req.body.name;
    testimonial.title = req.body.title;
    testimonial.description = req.body.description;

    await testimonial.save();

    req.flash('success', 'Testimonial updated successfully');
    res.redirect('/admin/testimonials');
  } catch (error) {
    console.error('Error updating Testimonial:', error);
    req.flash('error', 'Error updating Testimonial');
    res.status(500).json({ message: 'Error updating Testimonial', error: error.message });
  }
});


// Delete Testimonial
router.post('/deleteTestimonial/:id', isAdmin, async (req, res) => {
  try {
    const deletedTestimonial = await Test.findByIdAndDelete(req.params.id);
      // Check if the testimonial has an associated image
      if (deletedTestimonial.image) {
        // Delete the associated image from Cloudinary
        await uploader.destroy(deletedTestimonial.image);
      }
  
    req.flash('success', 'Testimonial deleted successfully');
    res.redirect('/admin/testimonials');
  } catch (error) {
    console.error('Error deleting Testimonial:', error);
    res.status(500).json({ message: 'Error deleting Testimonial', error: error.message });
  }
});

module.exports = router;
