const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
  commenterId: { type: String, required: true },
  postId: { type: String, required: true },
  commentDate: { type: Date, required: true },
  commentContent: { type: String, required: true }
});

const CommentModel = mongoose.model('comments', Comment);
module.exports = CommentModel;
