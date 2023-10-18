const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

module.exports = mongoose.model('Domain', domainSchema);