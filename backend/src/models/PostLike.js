const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostLike = new Schema({
  postId: { type: String, required: true },
  authorId: { type: String, required: true }
});

const PostLikeModel = mongoose.model('postLikes', PostLike);
module.exports = PostLikeModel;
