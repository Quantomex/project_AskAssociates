const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/Admin');
const Test = require('../models/testModel');
const Blog = require('../models/blogModel');
const Job = require('../models/jobsModel');


const {isAdmin} = require('../middleware/isAdmin');
// Admin Signup
router.get('/admin/signup', (req, res) => {
  res.render('./admin/adminSignup');
});
router.get('/', async (req , res) => {
  const test = await Test.find();
  const blogs = await Blog.find();
  res.render('./otherpages/home', {test,blogs});
});
router.post('/admin/signup', async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const foundUser = await Admin.findOne({ username });
    if (foundUser) {
        req.flash('error', 'Email already in use. Try different Email or Login instead.')
      return res.redirect('/admin/signup');
    }
    
    const admin = new Admin({ ...req.body });
    
    await Admin.register(admin, password);
    passport.authenticate('admin')(req, res, () => {
      res.redirect('/admin/login');
    });
  } catch (err) {
    next(err);
  }
});

// Admin Login
router.get('/admin/login', (req, res) => {
  res.render('./admin/adminLogin');
});

router.post('/admin/login', passport.authenticate('admin', {
  failureRedirect: '/admin/login',
  failureFlash: true
}), (req, res) => {
   req.flash('success', 'Welcome back, admin!');
  
  res.redirect('/admin/blog');
});

router.get('/tax', async (req , res) => {
  res.render('./otherpages/tax');
});

router.get('/aboutus', async (req , res) => {
  res.render('./otherpages/aboutus');
});
;
router.get('/openposition', async (req , res) => {
  const jobs = await Job.find();

  res.render('./otherpages/workus',{jobs});
});
module.exports = router;