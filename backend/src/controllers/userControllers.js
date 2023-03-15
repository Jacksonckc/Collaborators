const bcrypt = require('bcrypt');
var _ = require('lodash');
const mongoose = require('mongoose');

const { checkIfUserExists, encryptPassword, generateJWTToken } = require('../utils');
const {
  UserModel,
  PasswordModel,
  PostModel,
  CommentModel,
  ConnectionModel,
  PostLikeModel
} = require('../models');

const getUser = async (req, res) => {
  /*
  #swagger.description = 'Get a specific the user information by token'
  #swagger.responses[200] = {
    description: 'Successfully retrieved data. You will receive an user object',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[400] = {
    description: 'Cannot find the user. You will receive an err message',
    schema: { $ref: '#definitions/Err' }
  }
  */
  const user = req.user;

  try {
    const result = await UserModel.findById(user._id);
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve user data.' });
  }
};

const addUser = async (req, res) => {
  /* 
  #swagger.description = 'Create a new user' 
  #swagger.parameters['User Data'] = {
    in: 'body',
    type: 'object',
    required: true,
    schema: { $ref: '#/definitions/User' }
  } 
  #swagger.responses[201] = {
    description: 'User successfully created. You will receive the new user object.',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[400] = {
    description: 'Registration failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const isUserExist = await checkIfUserExists(req);
  if (isUserExist)
    return res.status(400).json({ err: 'Registration failed, try a different email.' });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const newUser = new UserModel({
      ...req.body,
      userProjectCount: 0,
      acorns: 10,
      userLevel: 1,
      userAvatarImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAMFBMVEXk5ueutLe9wsTn6eqrsbS1ur3S1dext7rHy83b3t/g4uTV2NrY293KztC4vcDAxcft1dkyAAAC7ElEQVR4nO2a25KDIAxAgXARRPn/v10v266tVQgS6s5wHjp980wIEAiMNRqNRqPRaDQajUbjHwAAzHpvHcz/vmLA+k7JB2Kw9T3AdkZK/mT6rwZXVQOc2Bo8RExXLxrAur3BqsF1JQvw5sBh1hjrOOhjhWVMbAWH4dRhxlIPCRylwzYYxBYJcVgsSB18igPnhlLCJSlMoRB0AwJjWiAmC7L1IjI5Xy2IHBikO3DZ0YQibWY8LRyJBDMIB6pQ9JhAEE1TGFEO0wQhkLA4B85HgvFAjsYUivISENASfXkJ1NxYJIbyocAGYtpAijtYtARXpR0w+8aTO0gU38RwG0eTeJMovZHeIyfuMDtusU5krJi8/IoJaAeC2goEfhctv4GhM5Oi6kdXVoqgsrpFjYleKWgOHrhABJJzB/IERnRHgTqLBhoHVCjITuUMVLID0aF8JnWtkBSnrwep09QQ3Qv8WiSdw6QnvkNM2Mcodq43i3gsalyyR+50qcdi5TQ7panUeQF2mBgUJ/FDjV590JBcVG1AAevH1waUlDKQ9xj2Hk4H8+wGqtB/pys5f9T2etDezj3SbxjA+vtgbdXW/D44r7sgRrXkwpQcRonQ6d7VEQHm+mH8/TR/y8w5NzptGakIMNuN5kNb9sWFT0nKiEQAfIgIbFcMTTAwYDuOKvmlFL6oBzAvcAqrhtLlRgX8mDgMOw81lNGYFbIMVo0S1QU49MX6LhpXCwwY8LmwJ1wZE2BXRuIPafKDkXVjd6CRexhKeSCQbpH3uAPf6jm3yCo+y6TDFnzh9amIvAo2PcvHYQY1IvhLy1QLhEPZnNyQ3rsuuD68g7hOI3NAPDFB3poiSUqLnEYTgsQ3P+h+NNLCJwSi5I7xERMPBebGNI/4bRJxRizE21K0U2Mh2i/NaPrhJSIVDn1azkQKHGx7J4/I41VHvEisRF7bJL63vCpxnhR0++cLp0t3nbycit5TiUHU4XQ4oBJnDo1Go9G4OT+TtCHF3Y7fZwAAAABJRU5ErkJggg=='
    });
    const hash = await encryptPassword(req.body.password);
    await PasswordModel.create({ userId: newUser._id.toString(), hash });
    newUser.save();
    await session.commitTransaction();
    res.status(201).json({ ...newUser._doc });
  } catch {
    res.status(400).json({ err: 'Cannot register user.' });
  }
};

const changeUserInfo = async (req, res) => {
  /*  
  #swagger.description = "Modify a user's info, you can only modify certain fields"
  #swagger.parameters['User Info'] = {
    in: 'body',
    type: 'object',
    required: true,
    schema: { $ref: '#/definitions/User' },
  }
  #swagger.responses[200] = {
    description: 'Update successful. You will receive the new user object.',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[400] = {
    description: 'Update failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const user = req.user;

  // in case someone passes in a password here
  try {
    const updatedData = _.omit(req.body, ['userEmail', 'userProjectCount', 'acorns', 'userLevel']);
    const updatedUserData = await UserModel.findByIdAndUpdate(user._id, updatedData, {
      new: true
    });
    res.status(200).json(updatedUserData);
  } catch {
    res.status(400).json({ err: 'Cannot change the user data to the database.' });
  }
};

const deleteUser = async (req, res) => {
  /*
  #swagger.description = 'Delete user information, you will receive 204 when deleted'
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
    const userPostIds = await PostModel.find({ authorId: user._id }).select('_id');
    const userPostIdStrings = userPostIds.map((id) => id._id.toString());
    await CommentModel.deleteMany({ commenterId: user._id });
    await CommentModel.deleteMany({ postId: { $in: userPostIdStrings } });
    await PostLikeModel.deleteMany({ authorId: user._id });
    await PostModel.deleteMany({ authorId: user._id });
    await ConnectionModel.deleteMany({ userIds: user._id });
    await PasswordModel.findOneAndDelete({ userId: user._id });
    await UserModel.findByIdAndDelete(user._id);

    res.sendStatus(204);
  } catch {
    res.status(400).json({ err: 'Cannot delete user.' });
  }
};

const updateUserPassword = async (req, res) => {
  /*  
  #swagger.description = "Modify a user's password"
  #swagger.parameters['Password'] = {
    in: 'body',
    type: 'object',
    required: true,
    schema: { password: 'new password' },
  } 
  #swagger.responses[200] = {
    description: 'Update successful. You will receive the new password object.',
    schema: { $ref: '#/definitions/Password' },
  }
  #swagger.responses[400] = {
    description: 'Update failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const user = req.user;

  try {
    const hash = await encryptPassword(req.body.password);
    const updatedPassword = await PasswordModel.findOneAndUpdate(
      { userId: user._id.toString() },
      { hash }
    );

    res.status(200).json(updatedPassword);
  } catch {
    res.status(400).json({ err: 'Fail to update the password.' });
  }
};

const loginUser = async (req, res) => {
  /*  
  #swagger.description = "Login using userEmail and password"
  #swagger.parameters['Login Info'] = {
    in: 'body',
    type: 'object',
    required: true,
    schema: { 
      $userEmail: 'Example@gmail.com',
      $password: 'xxxxxx'
    }
  }
  #swagger.responses[200] = {
    description: 'User successfully logged in. You will receive a token.',
    schema: { token:'something secret' }
  }
  #swagger.responses[400] = {
    description: 'Login failed, it might be caused by anything. You will receive an err message.',
     schema: { $ref: '#/definitions/Err' }
  } 
  */

  try {
    const user = await UserModel.findOne({ userEmail: req.body.userEmail });

    const userPasswordObj = await PasswordModel.findOne({ userId: user._id.toString() });

    const result = await bcrypt.compare(req.body.password, userPasswordObj.hash);
    result
      ? res.status(200).json({ token: generateJWTToken(user._id) })
      : res.status(400).json({ err: 'Information you enter is invalid!' });
  } catch {
    res.status(400).json({ err: 'Information you enter is invalid!' });
  }
};

const getUsers = async (req, res) => {
  /*
  #swagger.description = 'Get all the user information, only admin can access'
  #swagger.responses[200] = {
    description: 'Successfully retrieved all users. You will receive an array of user objects',
  }
  #swagger.responses[403] = {
    description: 'You are not an admin user. You will receive an err message',
    schema: { $ref: '#/definitions/Err' }
  }
  #swagger.responses[400] = {
    description: 'Falied to retrieve all users. You will receive an err message',
    schema: { $ref: '#/definitions/Err' }
  }
  */

  const user = req.user;
  if (user?.userLevel < 2) return res.status(403).json({ err: 'You are not authorized!' });
  var result;
  try {
    result = await UserModel.find();
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Failed to fetch all users' });
  }
};

const getOtherUser = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.userId);
    res.status(200).json(result);
  } catch {
    res.status(400).json({ err: 'Fail to retrieve user data.' });
  }
};

module.exports = {
  getUser,
  addUser,
  changeUserInfo,
  deleteUser,
  updateUserPassword,
  loginUser,
  getUsers,
  getOtherUser
};
