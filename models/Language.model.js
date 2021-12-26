const mongoose = require('mongoose');

const languageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
