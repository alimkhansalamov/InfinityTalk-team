const mongoose = require('mongoose');

const utilitySchema = mongoose.Schema({
  utilityImage: {
    type: String,
    required: true
  },
  utilityTitle: {
    type: String,
    required: true,
  },
  utilityCategory: {
    type: String,
    required: true,
  },
  utilityLink: {
    type: String,
    required: true,
  }
});

const Utility = mongoose.model('Utility', utilitySchema);

module.exports = Utility;