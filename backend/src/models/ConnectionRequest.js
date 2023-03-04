const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ConnectionRequestSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true }
});

const ConnectionRequestModel = mongoose.model('connectionRequest', ConnectionRequestSchema);
module.exports = ConnectionRequestModel;
