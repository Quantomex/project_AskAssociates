const express = require('express');
const router = express.Router();
const WhoWeAre = require('../models/whoweareModel');
const { isAdmin } = require('../middleware/isAdmin');
const { uploader } = require('cloudinary').v2;
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// Retrieve Who We Are Page on Admin Panel
router.get('/admin/whoweare', isAdmin, async (req, res) => {
  try {
    const whoweare = await WhoWeAre.find();
    res.render('./admin/whoweareView/whoweare', { whoweare });
  } catch (error) {
    console.error('Error retrieving Who We Are data:', error);
    req.flash('error', 'Error retrieving Who We Are data');
    res.status(500).json({ message: 'Error retrieving Who We Are data', error: error.message });
  }
});

// Create Who We Are Entry
router.post('/addWhoWeAre', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { image, title, description, name } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const whoWeAre = new WhoWeAre({ image: imageUrl, title, description, name });
    await whoWeAre.save();
    req.flash('success', 'Who We Are entry created successfully');
    res.redirect('/admin/whoweare');
  } catch (error) {
    console.error('Error creating Who We Are entry:', error);
    req.flash('error', 'Error creating Who We Are entry');
    res.status(500).json({ message: 'Error creating Who We Are entry', error: error.message });
  }
});

// Update Who We Are Entry Form
router.get('/editWhoWeAre/:id', isAdmin, async (req, res) => {
  try {
    const whoWeAre = await WhoWeAre.findById(req.params.id);
    if (!whoWeAre) {
      req.flash('error', 'Who We Are entry not found');
      return res.redirect('/admin/whoweare');
    }
    res.render('./admin/whoweareView/editWhoWeAre', { whoWeAre });
  } catch (error) {
    console.error('Error rendering Who We Are entry update form:', error);
    req.flash('error', 'Error rendering Who We Are entry update form');
    res.status(500).json({ message: 'Error rendering Who We Are entry update form', error: error.message });
  }
});

// Update Who We Are Entry
router.post('/editWhoWeAre/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { image, title, description, name } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const whoWeAre = await WhoWeAre.findById(req.params.id);
    if (!whoWeAre) {
      req.flash('error', 'Data not found');
      return res.redirect('/admin/whoweare');
    }

    whoWeAre.image = imageUrl;
    whoWeAre.title = title;
    whoWeAre.description = description;
    whoWeAre.name = name;

    await whoWeAre.save();

    req.flash('success', ' entry updated successfully');
    res.redirect('/admin/whoweare');
  } catch (error) {
    console.error('Error updating Who We Are entry:', error);
    req.flash('error', 'Error updating Who We Are entry');
    res.status(500).json({ message: 'Error updating Who We Are entry', error: error.message });
  }
});

// Delete Who We Are Entry
router.post('/deleteWhoWeAre/:id', isAdmin, async (req, res) => {
  try {
    const whoWeAre = await WhoWeAre.findByIdAndDelete(req.params.id);
    if (!whoWeAre) {
      req.flash('error', 'Who We Are entry not found');
      return res.redirect('/admin/whoweare');
    }

    // Delete the associated image from Cloudinary if necessary
    if (whoWeAre.image) {
      await uploader.destroy(whoWeAre.image);
    }

    req.flash('success', 'Who We Are entry deleted successfully');
    res.redirect('/admin/whoweare');
  } catch (error) {
    console.error('Error deleting Who We Are entry:', error);
    req.flash('error', 'Error deleting Who We Are entry');
    res.status(500).json({ message: 'Error deleting Who We Are entry', error: error.message });
  }
});

module.exports = router;
