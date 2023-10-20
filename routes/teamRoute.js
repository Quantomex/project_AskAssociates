const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel');
const { isAdmin } = require('../middleware/isAdmin');
const { uploader } = require('cloudinary').v2;
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// Retrieve Team Members on Admin Panel
router.get('/admin/team', isAdmin, async (req, res) => {
  const teamMembers = await Team.find();
  res.render('./admin/teamMembers', { teamMembers });
});

// Create Team Member
router.post('/admin/team/create', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { name, jobTitle, jobDescription } = req.body;
    const image = req.file ? req.file.path : '';
    const teamMember = new Team({ name, jobTitle, jobDescription, image });
    await teamMember.save();
    req.flash('success', 'Team member created successfully');
    res.redirect('/admin/team');
  } catch (error) {
    console.error('Error creating team member:', error);
    req.flash('error', 'Error creating team member');
    res.status(500).json({ message: 'Error creating team member', error: error.message });
  }
});

// Update Team Member
router.get('/editTeamMember/:id', isAdmin, async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    if (!teamMember) {
      req.flash('error', 'Team member not found');
      return res.redirect('/admin/team');
    }
    res.render('./admin/editTeamMember', { teamMember });
  } catch (error) {
    console.error('Error rendering team member update form:', error);
    req.flash('error', 'Error rendering team member update form');
    res.status(500).json({ message: 'Error rendering team member update form', error: error.message });
  }
});

// Update Team Member
router.post('/editTeamMember/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { name, jobTitle, jobDescription } = req.body;
    const image = req.file ? req.file.path : '';

    const teamMember = await Team.findById(req.params.id);
    if (!teamMember) {
      req.flash('error', 'Team member not found');
      return res.redirect('/admin/team');
    }

    teamMember.name = name;
    teamMember.jobTitle = jobTitle;
    teamMember.jobDescription = jobDescription;
    if (image) {
      teamMember.image = image;
    }

    await teamMember.save();
    req.flash('success', 'Team member updated successfully');
    res.redirect('/admin/team');
  } catch (error) {
    console.error('Error updating team member:', error);
    req.flash('error', 'Error updating team member');
    res.status(500).json({ message: 'Error updating team member', error: error.message });
  }
});

// Delete Team Member
router.post('/deleteTeamMember/:id', isAdmin, async (req, res) => {
  try {
    const deletedTeamMember = await Team.findByIdAndDelete(req.params.id);

    // Delete the associated image from Cloudinary
    if (deletedTeamMember.image) {
      await uploader.destroy(deletedTeamMember.image);
    }

    req.flash('success', 'Team member deleted successfully');
    res.redirect('/admin/team');
  } catch (error) {
    console.error('Error deleting team member:', error);
    req.flash('error', 'Error deleting team member');
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
});

module.exports = router;
