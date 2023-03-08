const { PostModel } = require('../models');
var _ = require('lodash');

const getUserPosts = async (req, res) => {
  const user = req.user;
  try {
    const result = await PostModel.find({ authorId: user._id.toString() });
    res.status(200).json(result);
  } catch {
    res.status(404).json({ err: 'Fail to retrieve your posts.' });
  }
};

const createPost = async (req, res) => {
  const user = req.user;
  if (!req.body.postCaption) {
    return res.status(400).json({ err: 'Cannot create post without a caption.' });
  }
  try {
    const newPost = new PostModel({
      authorId: user._id.toString(),
      postDate: new Date(),
      postCaption: req.body.postCaption,
      postLikeCounts: 0,
      postComments: []
    });

    newPost.save();

    res.status(201).json({ ...newPost._doc });
  } catch {
    res.status(400).json({ err: 'Cannot create post.' });
  }
};

const updatePost = async (req, res) => {
  const user = req.user;

  if (!req.body.postCaption) {
    return res.status(400).json({ err: 'Cannot change the post without a caption.' });
  }

  try {
    const updatedData = _.omit(req.body, [
      'authorId',
      'postDate',
      'postLikeCounts',
      'postComments'
    ]);

    const updatedPostData = await PostModel.findByIdAndUpdate(req.params.postId, updatedData, {
      new: true
    });
    res.status(200).json(updatedPostData);
  } catch {
    res.status(400).json({ err: 'Cannot change the post data to the database.' });
  }
};

const deletePost = async (req, res) => {
  const user = req.user;

  try {
    const post = await PostModel.findById(req.params.postId);
    if (user._id != post.authorId) return res.json({ err: 'You are not the author of this post!' });
    else {
      await PostModel.findByIdAndDelete(req.params.postId);
      res.sendStatus(200);
    }
  } catch {
    res.status(404).json({ err: 'Cannot delete post.' });
  }
};

const getAllPosts = async (req, res) => {
  const user = req.user;

  try {
    const result = await PostModel.find();
    res.status(200).json(result);
  } catch {
    res.status(404).json({ err: 'Fail to retrieve all posts.' });
  }
};

module.exports = { getUserPosts, createPost, updatePost, deletePost, getAllPosts };
