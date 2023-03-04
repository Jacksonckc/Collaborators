const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { ObjectID } = require('bson');
const mongoose = require('mongoose');
var _ = require('lodash');

const { PasswordModel, UserModel } = require('../models');

const checkIfUserExists = async (req) => {
  // this returns an object if the matched
  return UserModel.findOne({ userEmail: req.body.userEmail });
};

const encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, (saltRounds = 10));
  return hash;
};

const generateJWTToken = (userId) => {
  var token = jsonwebtoken.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1 hour
      data: { userId }
    },
    process.env.SECRET
  );
  return token;
};

module.exports = { checkIfUserExists, encryptPassword, generateJWTToken };
