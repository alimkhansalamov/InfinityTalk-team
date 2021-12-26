const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
  {
    members: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    }],
    messages: [{
      text: String,
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
      viewed: {
        type: Boolean,
        default: false
      }
    }],
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
