const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { UserModel } = require('../models');

const checkIfUserExists = async (req) => {
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
