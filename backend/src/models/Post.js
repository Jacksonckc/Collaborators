const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
  authorId: String,
  projectId: String
});

const PostModel = mongoose.model('posts', Post);
module.exports = PostModel;
