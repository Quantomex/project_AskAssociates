const express = require('express');
const router = express.Router();
const FormEntry = require('../models/FormEntry');

router.get('/getquote', (req , res) => {
    res.render('./admin/quotePage');
});
router.get('/admin/viewquote', async (req , res) => {
    getQuoteSubmissions = await FormEntry.find();
    res.render('./admin/adminQuotePage', { getQuoteSubmissions});
}); 
// Handle form submission
router.post('/submit', async (req, res) => {
  try {
    const { fullName, email, projectOverview, contactNumber } = req.body;

    const formEntry = new FormEntry({
      fullName,
      email,
      projectOverview,
      contactNumber,
    });
    await formEntry.save();
    req.flash('success', 'Quotation Sent Successfully')
   
    res.redirect('/getquote'); 
  } catch (error) {
    console.error('Error saving form entry:', error);
    req.flash('error', 'Error sending quotation ');
    res.status(500).json({ message: 'Error saving form entry', error: error.message });
  }
});
router.post('/deleteQuote/:id',  async (req, res) => {
    try {
        // Find and delete the quote submission by its ID
        const deletedSubmission = await FormEntry.findByIdAndDelete(req.params.id);

        req.flash('success', 'Quote submission deleted successfully');
        res.redirect('/admin/viewquote'); // Redirect to the viewquote page or wherever you want
    } catch (error) {
        console.error('Error deleting quote submission:', error);
        req.flash('error', 'Error deleting quote submission');
        res.status(500).json({ message: 'Error deleting quote submission', error: error.message });
    }
});
module.exports = router;
