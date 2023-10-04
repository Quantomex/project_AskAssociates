const mongoose = require('mongoose');

const orderCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('OrderCompany', orderCompanySchema);
