const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
 
});

// const Test = mongoose.model('Testimonial', testimonialSchema);

module.exports = mongoose.model('Test', testimonialSchema );
