const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
  // authorId: { type: Schema.Types.ObjectId, required: true, ref: 'UserMode' },
  authorId: { type: String, required: true },
  postDate: { type: Date, required: true },
  postCaption: { type: String, required: true },
  postLikes: { type: Number, required: true },
  postComments: [String]
});

const PostModel = mongoose.model('posts', Post);
module.exports = PostModel;
