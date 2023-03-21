const { CommentModel, PostModel } = require('../models');

const getAllCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const allComments = await CommentModel.find({ postId });
    res.status(200).json(allComments);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve all comments for this post.' });
  }
};

const addCommentToPost = async (req, res) => {
  const user = req.user;
  if (!req.body.commentContent) {
    return res.status(400).json({ err: 'Cannot create a comment without content.' });
  }
  try {
    const newComment = new CommentModel({
      commenterId: user._id,
      postId: req.body.postId,
      commentDate: new Date(),
      commentContent: req.body.commentContent
    });

    newComment.save();
    res.status(201).json({ ...newComment._doc });
  } catch {
    res.status(400).json({ err: 'Fail to add a comment to this post.' });
  }
};

const deleteComment = async (req, res) => {
  const user = req.user;
  const { commenterId, authorId, commentId } = req.body;

  try {
    if (user._id.toString() === commenterId || authorId === user._id.toString()) {
      await CommentModel.findByIdAndDelete(commentId);
    }
    res.sendStatus(200);
  } catch {
    res.status(400).json({ err: 'Fail to delete a comment from this post.' });
  }
};

module.exports = { getAllCommentsByPostId, addCommentToPost, deleteComment };
