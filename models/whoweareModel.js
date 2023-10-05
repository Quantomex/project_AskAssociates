const mongoose = require('mongoose');

const whoweareSchema = new mongoose.Schema({
  image: {
    type: String,

  },
  title: {
    type: String,
  
  },
  description: {
    type: String,
   
  },
  name: {
    type: String,

  },
});

module.exports = mongoose.model('WhoWeAre', whoweareSchema);
