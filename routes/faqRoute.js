const express = require('express');
const router = express.Router();
const FAQ = require('../models/faqModel');
const { isAdmin } = require('../middleware/isAdmin');
// Middleware to parse form data
router.use(express.urlencoded({ extended: true }));
// Add FAQ Page
router.get('/admin/FAQ', isAdmin, async (req, res) => {
  const FAQs = await FAQ.find();
  res.render('./admin/FAQView/FAQ', { FAQs });
});

// Create FAQ
router.post('/addFAQ', isAdmin, async (req, res) => {
  try {
    const { question, answer } = req.body;
    const FAQss = new FAQ({ question, answer });
    await FAQss.save();
    req.flash('success', 'FAQ added successfully');
    res.redirect('/admin/FAQ');
  } catch (error) {
    console.error('Error adding FAQ:', error);
    req.flash('error', 'Error adding FAQ');
    res.status(500).json({ message: 'Error adding FAQ', error: error.message });
  }
});

// Edit FAQ Form
router.get('/editFAQ/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const FAQss = await FAQ.findById(id);

    if (!FAQss) {
      req.flash('error', 'FAQ not found');
      return res.redirect('/admin/FAQ');
    }

    res.render('./admin/FAQView/editFAQ', { FAQss });
  } catch (error) {
    console.error('Error retrieving FAQ:', error);
    res.status(500).json({ message: 'Error retrieving FAQ', error: error.message });
  }
});

// Update FAQ
router.post('/editFAQ/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const FAQss = await FAQ.findById(id);

    if (!FAQss) {
      req.flash('error', 'FAQ not found');
      return res.redirect('/admin/FAQ');
    }

    FAQss.question = req.body.question;
    FAQss.answer = req.body.answer;

    await FAQss.save();

    req.flash('success', 'FAQ updated successfully');
    res.redirect('/admin/FAQ');
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Error updating FAQ', error: error.message });
  }
});

// Delete FAQ
router.post('/deleteFAQ/:id', isAdmin, async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
    req.flash('success', 'FAQ deleted successfully');
    res.redirect('/admin/FAQ');
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
  }
});

module.exports = router;
