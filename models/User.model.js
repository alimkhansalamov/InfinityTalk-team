const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
      default: null,
    },
    description: {
      type: String,
    },
    instagram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    telegram: {
      type: String,
    },
    defaultLanguage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Language',
    },
    learnLanguage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Language',
    },
    rating: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
