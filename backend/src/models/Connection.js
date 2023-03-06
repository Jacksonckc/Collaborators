const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  accepted: { type: Boolean, required: true },
  userIds: { type: [String], required: true }
});

const ConnectionModel = mongoose.model('connection', ConnectionSchema);

module.exports = ConnectionModel;
