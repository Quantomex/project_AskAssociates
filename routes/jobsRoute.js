const express = require('express');
const router = express.Router();
const Job = require('../models/jobsModel');
const { isAdmin } = require('../middleware/isAdmin');
const { uploader } = require('cloudinary').v2;
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// Retrieve Jobs page on Admin Panel
router.get('/admin/jobs', isAdmin, async (req, res) => {
  const jobs = await Job.find();
  res.render('./admin/jobView/jobs', { jobs });
});
 
// Create Job Listing
router.post('/addJob', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { image, jobTitle, jobDescription, urlLink } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const job = new Job({ image: imageUrl, jobTitle, jobDescription, urlLink });
    await job.save();
    req.flash('success', 'Job listing created successfully');
    res.redirect('/admin/jobs');
  } catch (error) {
    console.error('Error creating job listing:', error);
    req.flash('error', 'Error creating job listing');
    res.status(500).json({ message: 'Error creating job listing', error: error.message });
  }
});

// Update Job Listing
router.get('/editJob/:id', isAdmin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      req.flash('error', 'Job listing not found');
      return res.redirect('/admin/jobs');
    }
    res.render('./admin/jobView/editJobs', { job });
  } catch (error) {
    console.error('Error rendering job update form:', error);
    req.flash('error', 'Error rendering job update form');
    res.status(500).json({ message: 'Error rendering job update form', error: error.message });
  }
});

// Update Job Listing
router.post('/editJob/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { image, jobTitle, jobDescription, urlLink } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const job = await Job.findById(req.params.id);
    if (!job) {
      req.flash('error', 'Job listing not found');
      return res.redirect('/admin/jobs');
    }

    job.image = imageUrl;
    job.jobTitle = jobTitle;
    job.jobDescription = jobDescription;
    job.urlLink = urlLink;

    await job.save();

    req.flash('success', 'Job listing updated successfully');
    res.redirect('/admin/jobs');
  } catch (error) {
    console.error('Error updating job listing:', error);
    req.flash('error', 'Error updating job listing');
    res.status(500).json({ message: 'Error updating job listing', error: error.message });
  }
});

// Delete Job Listing
router.post('/deleteJob/:id', isAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      req.flash('error', 'Job listing not found');
      return res.redirect('/admin/jobs');
    }

    // Delete the associated image from Cloudinary if necessary
    if (job.image) {
      await uploader.destroy(job.image);
    }

    req.flash('success', 'Job listing deleted successfully');
    res.redirect('/admin/jobs');
  } catch (error) {
    console.error('Error deleting job listing:', error);
    req.flash('error', 'Error deleting job listing');
    res.status(500).json({ message: 'Error deleting job listing', error: error.message });
  }
});

module.exports = router;
