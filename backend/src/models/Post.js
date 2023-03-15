const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
  authorId: { type: String, required: true },
  postDate: { type: Date, required: true },
  postCaption: { type: String, required: true },
  postLikeCounts: { type: Number, required: true }
});

const PostModel = mongoose.model('posts', Post);
module.exports = PostModel;
