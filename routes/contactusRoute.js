const express = require('express');
const router = express.Router();
const ContactUs = require('../models/contactUsModel');
const { isAdmin } = require('../middleware/isAdmin');

// Contact Us Page on Admin Side
router.get('/admin/contactUs', isAdmin, async (req, res) => {
  const contactUsSubmissions = await ContactUs.find();
  res.render('./admin/contactUsView/contactUs', { contactUsSubmissions });
});
// Contact Us Page on User Side
router.get('/contactus', async (req, res) => {
    const contactuspage = await ContactUs.find();
    res.render('./otherpages/contactus', {contactuspage});
});
// Create Contact Us Submission
router.post('/addContactUs', async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;
    const contactUsSubmission = new ContactUs({ fullName, email, phone, message });
    await contactUsSubmission.save();
    req.flash('success', 'Contact Us submission added successfully');
    res.redirect('/contactUs'); 
  } catch (error) {
    console.error('Error adding Contact Us submission:', error);
    req.flash('error', 'Error adding Contact Us submission');
    res.status(500).json({ message: 'Error adding Contact Us submission', error: error.message });
  }
});


// Delete Contact Us Submission
router.post('/deleteContactUs/:id', isAdmin, async (req, res) => {
  try {
    const deletedContactUs = await ContactUs.findByIdAndDelete(req.params.id);
    req.flash('success', 'Contact Us submission deleted successfully');
    res.redirect('/admin/contactUs');
  } catch (error) {
    console.error('Error deleting Contact Us submission:', error);
    res.status(500).json({ message: 'Error deleting Contact Us submission', error: error.message });
  }
});

module.exports = router;
