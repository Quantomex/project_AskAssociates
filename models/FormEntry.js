const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  projectOverview: { type: String, required: true },
  contactNumber: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FormEntry', formEntrySchema);