const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({
  userIds: { type: [String], required: true }
});

const ConnectionModel = mongoose.model('connection', ConnectionSchema);

module.exports = ConnectionModel;
