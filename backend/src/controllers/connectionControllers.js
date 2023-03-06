const { ConnectionModel, UserModel } = require('../models');

const getSuggestedConnections = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

  try {
    const existedConnections = await ConnectionModel.find({ userIds: user._id }).select('userIds');

    const existedConnectionsIds = [user._id];
    if (existedConnections.length > 0) {
      existedConnections.forEach((connection) => {
        existedConnectionsIds.push(...connection.userIds);
      });
    }
    let uniqueExistedConnectionsIds = [...new Set(existedConnectionsIds)];
    // console.log(...uniqueExistedConnectionsIds);

    const result = await UserModel.find({
      _id: { $nin: uniqueExistedConnectionsIds }
    });

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(404).json({ err: 'Fail to retrieve suggested connections.' });
  }
};

const sendConnectionRequest = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ err: 'You are not authorized!' });

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

module.exports = { getSuggestedConnections, sendConnectionRequest };
