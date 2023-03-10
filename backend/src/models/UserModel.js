const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  userEmail: { type: String, required: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userBirthday: Date,
  userPhone: String,
  userStory: String,
  userAvatarImg: String,
  userProjectCount: { type: Number, required: true },
  acorns: { type: Number, required: true },
  userLevel: { type: Number, required: true },
  status: String
});

const UserModel = mongoose.model('users', User);

module.exports = UserModel;
