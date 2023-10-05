const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  image: {
    type: String, 
 
  },
  name: {
    type: String,
 
  },
  title: {
    type: String,
 
  },
  description: {
    type: String,
 
  },
  rating: {
    type: Number,
 
  },
 
});

// const Test = mongoose.model('Testimonial', testimonialSchema);

module.exports = mongoose.model('Test', testimonialSchema );
