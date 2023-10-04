const express = require('express');
const router = express.Router();
const OrderCompany = require('../models/ordercompanyModel'); // Import the OrderCompany model
const { isAdmin } = require('../middleware/isAdmin');

// OrderCompanies Page on Admin Side
router.get('/admin/orderCompanies', isAdmin, async (req, res) => {
  const orderCompanies = await OrderCompany.find();
  res.render('./admin/orderCompanyView/orderCompanies', { orderCompanies });
});

// OrderCompanies Page on User Side
router.get('/ordercompany', async (req, res) => {
  const orderCompanies = await OrderCompany.find();
  res.render('./otherpages/ordercompany', { orderCompanies });
});

// Create Order Company Submission
router.post('/addOrderCompany', isAdmin, async (req, res) => {
  try {
    const { name, companyName, address, phoneNumber, emailAddress} = req.body;
    const orderCompanySubmission = new OrderCompany({
      name,
      companyName,
      address,
      phoneNumber,
      emailAddress,
   
    });
    await orderCompanySubmission.save();
    req.flash('success', 'Order Company submission added successfully');
    res.redirect('/ordercompany');
  } catch (error) {
    console.error('Error adding Order Company submission:', error);
    req.flash('error', 'Error adding Order Company submission');
    res.status(500).json({ message: 'Error adding Order Company submission', error: error.message });
  }
});

// Delete Order Company Submission
router.post('/deleteOrderCompany/:id', isAdmin, async (req, res) => {
  try {
    const deletedOrderCompany = await OrderCompany.findByIdAndDelete(req.params.id);
    req.flash('success', 'Order Company submission deleted successfully');
    res.redirect('/admin/orderCompanies');
  } catch (error) {
    console.error('Error deleting Order Company submission:', error);
    res.status(500).json({ message: 'Error deleting Order Company submission', error: error.message });
  }
});

module.exports = router;
