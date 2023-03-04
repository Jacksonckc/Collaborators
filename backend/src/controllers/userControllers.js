const { ObjectID } = require('bson');
const bcrypt = require('bcrypt');
var _ = require('lodash');
const mongoose = require('mongoose');

const { checkIfUserExists, encryptPassword, generateJWTToken } = require('../utils');
const { UserModel, PasswordModel } = require('../models');

const getUser = async (req, res) => {
  /*
  #swagger.description = 'Get a specific the user information by token'
  #swagger.responses[200] = {
    description: 'Successfully retrieved data. You will receive an user object',
    schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[404] = {
    description: 'Cannot find the user. You will receive an err message',
    schema: { $ref: '#definitions/Err' }
  }
  */
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

  try {
    const result = await UserModel.findById(req.user._id);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ err: e });
  }
};

const addUser = async (req, res) => {
  /* 
  #swagger.description = 'Create a new user' 
  #swagger.parameters['User Data'] = {
    in: 'body',
    type: 'object',
    required: true,
    description: 'Register a new user',
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
      userLevel: 1
    });
    // const newUser = await UserModel.findOne({ email: req.body.email });
    const hash = await encryptPassword(req.body.password);
    await PasswordModel.create({ userId: ObjectID(newUser._id), hash });
    newUser.save();
    await session.commitTransaction();
    res.status(201).json({ ...newUser._doc });
  } catch (e) {
    res.status(400).json({ err: e });
  }
};

const changeUserInfo = async (req, res) => {
  /*  
  #swagger.description = "Modify a user's info, you can only modify certain fields"
  #swagger.parameters['User Info'] = {
    in: 'body',
    type: 'object',
    required: true,
    description: 'Please only input what needs to be changed, if you leave the default value, they will be updated to the DB',
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
  if (!user) return res.json({ err: 'You are not authorized!' });

  // in case someone passes in a password here

  try {
    const updatedData = _.omit(req.body, ['userEmail', 'userProjectCount', 'acorns', 'userLevel']);
    const updatedUserData = await UserModel.findByIdAndUpdate(req.user._id, updatedData, {
      new: true
    });
    res.status(200).json(updatedUserData);
  } catch (e) {
    res.status(400).json({ err: 'Cannot change the user data to the database.' });
  }
};

const deleteUser = async (req, res) => {
  /*
  #swagger.description = 'Delete user information, you will receive 204 when deleted'
  #swagger.responses[200] = {
    description: 'Deletion successful. There will be no return value'
  }
  #swagger.responses[400] = {
    description: 'Deletion failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

  try {
    await UserModel.findByIdAndDelete(req.user._id);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).json({ err: 'Cannot delete user' });
  }
};

const updateUserPassword = async (req, res) => {
  /*  
  #swagger.description = "Modify a user's password, you will recieve a 200 when succeed"
  #swagger.parameters['Password'] = {
    in: 'body',
    type: 'object',
    required: true,
    description: 'Input your new password',
    schema: { $ref: '#/definitions/UpdatePassword' },
  } */
  // try {
  //   const hash = await encryptPassword(req.user._id, req.body.password);
  //   const data = { hash: hash };
  //   await mongodb
  //     .getDb()
  //     .db('acorn_currency')
  //     .collection('passwords')
  //     .updateOne({ userId: req.user._id }, { $set: data }, { upsert: true });
  //   res.json({ err: 'Your password has been updated.' });
  // } catch {
  //   res.json({ err: 'Oops, something went wrong when you change your password.' });
  // }
};

const loginUser = async (req, res) => {
  /*  
  #swagger.description = "Login using userEmail and password"
  #swagger.parameters['Login Info'] = {
    in: 'body',
    type: 'object',
    required: true,
    description: 'Input login info',
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
  const user = await UserModel.findOne({ userEmail: req.body.userEmail });

  const userPasswordObj = await PasswordModel.findOne({ userId: user._id });

  const result = bcrypt.compare(req.body.password, userPasswordObj.hash);
  result
    ? res.status(200).json({ token: generateJWTToken(user._id) })
    : res.status(400).json({ err: 'Information you enter is invalid!' });
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
  #swagger.responses[404] = {
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
  } catch (e) {
    console.log(e);
    res.status(404).json({ err: 'Failed to fetch all users' });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  changeUserInfo,
  deleteUser,
  loginUser,
  updateUserPassword
};
