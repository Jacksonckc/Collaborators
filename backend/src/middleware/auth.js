const { verify } = require('jsonwebtoken');

const { UserModel } = require('../models/');

const getAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer', '').trim();
  try {
    if (token) {
      // secret will be an env
      const decodedTokenInfo = verify(token, 'secret');
      const user = await UserModel.findById(decodedTokenInfo.data.userId);
      req.user = user;
    }
  } catch (e) {
    console.log(e);
  }
  next();
};

module.exports = { getAuth };
