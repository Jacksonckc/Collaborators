const { PostModel } = require('../models');

const getUserPosts = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });
  try {
    const result = await PostModel.find({ authorId: req.user._id.toString() });
    res.status(200).json(result);
  } catch {
    res.status(404).json({ err: 'Fail to retrieve your posts.' });
  }
};

const createPost = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });
  if (!req.body.postCaption) {
    return res.status(400).json({ err: 'Cannot create post without a caption.' });
  }
  try {
    const newPost = new PostModel({
      authorId: req.user._id,
      postDate: new Date(),
      postCaption: req.body.postCaption,
      postLikes: 0,
      postComments: []
    });

    newPost.save();

    res.status(201).json({ ...newPost._doc });
  } catch {
    res.status(400).json({ err: 'Cannot create post.' });
  }
};

const deletePost = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

  try {
    const post = await PostModel.findById(req.body.postId);
    if (user._id != post.authorId) return res.json({ err: 'You are not the author of this post!' });
    else {
      await PostModel.findByIdAndDelete(req.body.postId);
      res.sendStatus(200);
    }
  } catch {
    res.status(404).json({ err: 'Cannot delete post.' });
  }
};

const getAllPosts = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

  try {
    const result = await PostModel.find();
    res.status(200).json(result);
  } catch {
    res.status(404).json({ err: 'Fail to retrieve all posts.' });
  }
};

module.exports = { getUserPosts, createPost, deletePost, getAllPosts };
