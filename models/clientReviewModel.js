const mongoose = require('mongoose');

const clientReviewSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
 
  },
  reviewOfJob: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
  },
});

const ClientReview = mongoose.model('ClientReview', clientReviewSchema);

module.exports = ClientReview;
