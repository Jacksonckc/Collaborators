const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
  authorId: { type: String, required: true },
  projectId: String,
  postDate: { type: Date, required: true },
  postCaption: { type: String, required: true },
  postLikes: { type: Number, required: true },
  postComments: [String]
});

const PostModel = mongoose.model('posts', Post);
module.exports = PostModel;
