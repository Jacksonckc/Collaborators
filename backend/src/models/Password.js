const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const Schema = mongoose.Schema;

const Password = new Schema({
  userId: ObjectID,
  hash: String
});

const PasswordModel = mongoose.model('passwords', Password);
module.exports = PasswordModel;
