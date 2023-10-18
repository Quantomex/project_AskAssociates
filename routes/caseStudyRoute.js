const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/caseStudyModel'); // Make sure to require the correct model
const Domain = require('../models/domainModel');
const { isAdmin } = require('../middleware/isAdmin');
const { uploader } = require('cloudinary').v2;
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// Retrieve Case Studies page on Admin Panel
router.get('/admin/case-studies', isAdmin, async (req, res) => {
  const caseStudies = await CaseStudy.find();
  res.render('./admin/caseStudyView', { caseStudies });
});

// Case Studies Page For User
router.get('/case-studies', async (req, res) => {
  const caseStudies = await CaseStudy.find();
  res.render('./otherpages/caseStudies', { caseStudies });
});

// Create Case Study
router.post('/admin/case-study/create', upload.single('image'), isAdmin, async (req, res) => {
    try {
      const { title, text, domain } = req.body;
      const image = req.file ? req.file.path : '';
      const caseStudy = new CaseStudy({ title, text, domain, image });
      await caseStudy.save();
  
      // Increment the count for each selected domain
      for (const selectedDomain of domain) {
        await Domain.updateOne({ name: selectedDomain }, { $inc: { count: 1 } }, { upsert: true });
      }
  
      req.flash('success', 'Case Study created successfully');
      res.redirect('/admin/case-studies');
    } catch (error) {
      console.error('Error creating case study:', error);
      req.flash('error', 'Error creating case study');
      res.status(500).json({ message: 'Error creating case study', error: error.message });
    }
  });

// Update Case Study
router.get('/editCaseStudy/:id', isAdmin, async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) {
      req.flash('error', 'Case Study not found');
      return res.redirect('/admin/case-studies');
    }
    res.render('./admin/editCaseStudy', { caseStudy });
  } catch (error) {
    console.error('Error rendering case study update form:', error);
    req.flash('error', 'Error rendering case study update form');
    res.status(500).json({ message: 'Error rendering case study update form', error: error.message });
  }
});

// Update Case Study
router.post('/editCaseStudy/:id', upload.single('image'), isAdmin, async (req, res) => {
    try {
      const { title, text, domain } = req.body;
      const image = req.file ? req.file.path : '';
      const caseStudy = await CaseStudy.findById(req.params.id);
  
      if (!caseStudy) {
        req.flash('error', 'Case Study not found');
        return res.redirect('/admin/case-studies');
      }
  
      // Decrement the count for previously selected domains
      for (const previousDomain of caseStudy.domain) {
        await Domain.updateOne({ name: previousDomain }, { $inc: { count: -1 } });
      }
  
      caseStudy.title = title;
      caseStudy.text = text;
      caseStudy.domain = domain;
      if (image) {
        caseStudy.image = image;
      }
  
      // Increment the count for new selected domains
      for (const selectedDomain of domain) {
        await Domain.updateOne({ name: selectedDomain }, { $inc: { count: 1 } }, { upsert: true });
      }
  
      await caseStudy.save();
      req.flash('success', 'Case Study updated successfully');
      res.redirect('/admin/case-studies');
    } catch (error) {
      console.error('Error updating case study:', error);
      req.flash('error', 'Error updating case study');
      res.status(500).json({ message: 'Error updating case study', error: error.message });
    }
  });
  

// View Single Case Study
router.get('/case-study/:id', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      req.flash('error', 'Case Study not found');
      return res.redirect('/case-studies');
    }

    res.render('./admin/singleCaseStudy', { caseStudy });
  } catch (error) {
    console.error('Error viewing case study:', error);
    req.flash('error', 'Error viewing case study');
    res.status(500).json({ message: 'Error viewing case study', error: error.message });
  }
});

// Delete Case Study
router.post('/deleteCaseStudy/:id', isAdmin, async (req, res) => {
  try {
    const deletedCaseStudy = await CaseStudy.findByIdAndDelete(req.params.id);

    if (deletedCaseStudy.image) {
      await uploader.destroy(deletedCaseStudy.image);
    }

    req.flash('success', 'Case Study deleted successfully');
    res.redirect('/admin/case-studies');
  } catch (error) {
    console.error('Error deleting case study:', error);
    req.flash('error', 'Error deleting case study');
    res.status(500).json({ message: 'Error deleting case study', error: error.message });
  }
});



// Add this function to your code
function renderAllDomainCounts(res, domainNames, counts) {
    res.render('./admin/domainCount', { domainNames, counts });
  }
// Add this function to your code
async function getDomainCounts(domainNames) {
    const counts = {};
  
    for (const domainName of domainNames) {
      const count = await CaseStudy.countDocuments({ domain: domainName });
      counts[domainName] = count;
    }
  
    return counts;
  }

// Route to get total count for all domains
router.get('/domain-count/all', async (req, res) => {
    const domainNames = [
      'Website Designed',
      'Apps Developed',
      'SEO',
      'Happy Clients',
      'AI & IOT solutions',
      'Games Developed',
      'Data Science projects',
      'Other'
    ];
  
    const counts = {};
    
    for (const domainName of domainNames) {
      const count = await CaseStudy.countDocuments({ domain: domainName });
      counts[domainName] = count;
    }
  
    res.render('./admin/domainCount', { domainNames, counts });
  });

module.exports = router;
