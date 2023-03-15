const { PostLikeModel, PostModel } = require('../models');

const getLikeByPostId = async (req, res) => {
  const user = req.user;
  try {
    const result = await PostLikeModel.findOne({
      postId: req.params.postId,
      authorId: user._id
    });
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve like for this post.' });
  }
};
const getPostLikeCountByPostId = async (req, res) => {
  try {
    const result = await PostLikeModel.find({
      postId: req.params.postId
    });
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve like for this post.' });
  }
};

const likePost = async (req, res) => {
  const user = req.user;
  try {
    const result = await PostLikeModel.findOne({
      postId: req.body.postId,
      authorId: user._id
    });

    if (result) {
      return res.status(400).json({ err: 'Already liked!' });
    }

    const newPostLike = new PostLikeModel({
      authorId: user._id,
      postId: req.body.postId
    });

    // const post = await PostModel.findById(req.body.postId);
    // await PostModel.findByIdAndUpdate(req.body.postId, { postLikeCount: post.postLikeCount + 1 });

    newPostLike.save();

    res.status(201).json({ ...newPostLike._doc });
  } catch {
    res.status(400).json({ err: 'Fail to like this post.' });
  }
};
const unLikePost = async (req, res) => {
  const user = req.user;

  try {
    const result = await PostLikeModel.findOne({
      postId: req.body.postId,
      authorId: user._id
    });

    if (!result) {
      return res.status(400).json({ err: 'Already unliked!' });
    }

    await PostLikeModel.findOneAndRemove({
      postId: req.body.postId,
      authorId: user._id
    });
    // const post = await PostModel.findById(req.body.postId);
    // await PostModel.findByIdAndUpdate(req.body.postId, { postLikeCount: post.postLikeCount - 1 });
    res.sendStatus(200);
  } catch {
    res.status(400).json({ err: 'Fail to unlike this post.' });
  }
};

module.exports = { getLikeByPostId, getPostLikeCountByPostId, likePost, unLikePost };
