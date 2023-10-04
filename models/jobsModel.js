const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  urlLink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);
