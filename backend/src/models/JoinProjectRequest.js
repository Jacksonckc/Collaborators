const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JoinProjectRequestSchema = new Schema({
  senderId: { type: String, required: true },
  projectId: { type: String, required: true },
  accepted: { type: Boolean, required: true }
});

const JoinProjectRequestModel = mongoose.model('joinProjectRequests', JoinProjectRequestSchema);

module.exports = JoinProjectRequestModel;
