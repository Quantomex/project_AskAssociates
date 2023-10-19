const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, 
  },
  name: {
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
});

module.exports = mongoose.model('Team', teamSchema);
