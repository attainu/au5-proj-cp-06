const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    handle: {
      type: String
    },
    bio: {
      type: String
    },
    imageUrl: {
      type: String
    },
    location: {
      type: String
    },
    website: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('user', userSchema);
