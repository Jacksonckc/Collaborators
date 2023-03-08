const { PostModel } = require('../models');
var _ = require('lodash');

const getUserPosts = async (req, res) => {
  /*
  #swagger.description = 'Get all the posts for you.'
  #swager.responses[200] = {
    description: 'Successfully retrieved data. You will receive an array of post objects',
    schema: { $ref: '#/definitions/Post' }  
  }
  #swager.responses[400] = {
    description: 'Fail retrieved data. You will receive an error message',
    schema: { $ref: '#/definitions/Err' }  
  }
  */
  const user = req.user;
  try {
    const result = await PostModel.find({ authorId: user._id.toString() });
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve your posts.' });
  }
};

const createPost = async (req, res) => {
  /* 
  #swagger.description = 'Create a post!' 
  #swagger.parameters['Post Data'] = {
    in: 'body',
    type: 'object',
    required: true,
    schema: { postCaption: 'string' }
  } 
  #swagger.responses[201] = {
    description: 'Post successfully created. You will receive the new post object.',
    schema: { $ref: '#/definitions/Post' }
  }
  #swagger.responses[400] = {
    description: 'Failed to create a post, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
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
  /*  
  #swagger.description = "Modify a post's info, you can only modify certain fields"
  #swagger.parameters['Post data'] = {
    in: 'body',
    type: 'object',
    required: true,
    schema: { postCaption: 'string' },
  }
  #swagger.responses[200] = {
    description: 'Update successful. You will receive the new post object.',
    schema: { $ref: '#/definitions/Post' }
  }
  #swagger.responses[400] = {
    description: 'Update failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
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
  /*
  #swagger.description = 'Delete post information, you will receive 204 when deleted'
  #swagger.responses[204] = {
    description: 'Deletion successful. There will be no return value'
  }
  #swagger.responses[400] = {
    description: 'Deletion failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const user = req.user;

  try {
    const post = await PostModel.findById(req.params.postId);
    if (user._id != post.authorId) return res.json({ err: 'You are not the author of this post!' });
    else {
      await PostModel.findByIdAndDelete(req.params.postId);
      res.sendStatus(204);
    }
  } catch {
    res.status(400).json({ err: 'Cannot delete post.' });
  }
};

const getAllPosts = async (req, res) => {
  /*
  #swagger.description = 'Get all the posts from all the users.'
  #swager.responses[200] = {
    description: 'Successfully retrieved data. You will receive an array of post objects',
    schema: { $ref: '#/definitions/Post' }  
  }
  #swager.responses[400] = {
    description: 'Fail retrieved data. You will receive an error message',
    schema: { $ref: '#/definitions/Err' }  
  }
  */
  try {
    const result = await PostModel.find();
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve all posts.' });
  }
};

module.exports = { getUserPosts, createPost, updatePost, deletePost, getAllPosts };
