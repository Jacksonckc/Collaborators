var _ = require('lodash');
const mongoose = require('mongoose');

const { PostModel, ProjectModel } = require('../models');

const getUserPosts = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

  try {
    const result = await PostModel.findOne({ authorId: req.user._id.toString() });
    res.status(200).json(result);
  } catch {
    res.status(404).json({ err: 'Fail to retrieve your posts.' });
  }
};

const createPost = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    let newProject;
    if (req.body.projectData) {
      newProject = new ProjectModel({
        ...req.body.projectData,
        isProjectFinished: false,
        peopleOnProject: []
      });
      newProject.save();
    }
    const newPost = new PostModel({
      authorId: req.user._id,
      projectId: newProject ? newProject._id.toString() : null,
      postDate: new Date(),
      postCaption: req.body.postCaption,
      postLikes: 0,
      postComments: []
    });

    newPost.save();
    await session.commitTransaction();
    const sendBackJson = req.body.projectData
      ? { post: { ...newPost._doc }, project: { ...newProject._doc } }
      : { post: { ...newPost._doc } };
    res.status(201).json(sendBackJson);
  } catch {
    res.status(400).json({ err: 'Cannot create post.' });
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

module.exports = { getUserPosts, createPost, getAllPosts };
