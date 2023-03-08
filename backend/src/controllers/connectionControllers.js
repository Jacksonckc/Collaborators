const { ConnectionModel, UserModel } = require('../models');
const { flatten } = require('lodash');

const getSuggestedConnections = async (req, res) => {
  const user = req.user;

  try {
    const existedConnections = await ConnectionModel.find({ userIds: user._id }).select('userIds');

    const existedConnectionsIds = [
      ...new Set(flatten(existedConnections.map((c) => c.userIds))),
      user._id.toString()
    ];
    const result = await UserModel.find({
      _id: { $nin: existedConnectionsIds }
    });

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(404).json({ err: 'Fail to retrieve suggested connections.' });
  }
};

const sendConnectionRequest = async (req, res) => {
  const user = req.user;

  // set cannot connect to yourself and cannot make duplicate connections.
  if (user._id.toString() === req.body.receiverId)
    return res.json({ err: 'You cannot send a connection request to yourself!' });

  try {
    const result = await ConnectionModel.find({
      userIds: {
        $all: [user._id, req.body.receiverId]
      }
    });

    if (result.length > 0)
      return res
        .status(404)
        .json({ err: 'The connection request is already sent by or to you, please double check.' });

    const newConnection = new ConnectionModel({
      senderId: user._id,
      receiverId: req.body.receiverId,
      accepted: false,
      userIds: [user._id.toString(), req.body.receiverId.toString()]
    });
    newConnection.save();
    res.status(201).json({ ...newConnection._doc });
  } catch {
    res.status(404).json({ err: 'Fail to send connection request.' });
  }
};

const cancelConnectionRequest = async (req, res) => {
  const user = req.user;

  try {
    await ConnectionModel.findOneAndDelete({
      userIds: {
        $all: [user._id, req.params.receiverId]
      }
    });

    res.sendStatus(200);
  } catch {
    res.status(404).json({ err: 'Fail to cancel connection request.' });
  }
};

// const getAllConnections = async (req,res)=>{
//   const user = req.user;

// }

module.exports = { getSuggestedConnections, sendConnectionRequest, cancelConnectionRequest };
