const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    body: {
      required: true,
      type: String
    },
    userHandle: {
      required: true,
      type: String
    },
    likeCount: {
      type: Number,
      default: 0
    },
    comments: {
      type: Object,
      commentHandle: {
        type: String,
        required: true
      },
      commentBody: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('post', postSchema);
