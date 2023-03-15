const { ConnectionModel, UserModel } = require('../models');
const { flatten } = require('lodash');

const getSuggestedConnections = async (req, res) => {
  /*
  #swagger.description = 'Get all the users except for the ones you have connections with.'
  #swagger.responses[200] = {
    description: 'Successfully retrieved all suggested users. You will receive an array of user objects',
    schema: { $ref: '#/definitions/Connection' }
  }
  #swagger.responses[400] = {
    description: 'Falied to retrieve all suggested users. You will receive an err message',
    schema: { $ref: '#/definitions/Err' }
  }
  */
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
    res.status(400).json({ err: 'Fail to retrieve suggested connections.' });
  }
};

const sendConnectionRequest = async (req, res) => {
  /* 
  #swagger.description = 'Create a new connection request' 
  #swagger.parameters['Connection Request Data'] = {
    in: 'body',
    type: 'object',
    required: true,
    schema: { receiverId: 'string' }
  } 
  #swagger.responses[201] = {
    description: 'Connection request successfully created. You will receive the new connection object.',
    schema: { $ref: '#/definitions/Connection' }
  }
  #swagger.responses[400] = {
    description: 'Failed to send a connection request, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
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
        .status(400)
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
    res.status(400).json({ err: 'Fail to send connection request.' });
  }
};

const cancelConnectionRequest = async (req, res) => {
  /*
  #swagger.description = 'Cancel a connection request, you will receive 200 when canceled.'
  #swagger.responses[200] = {
    description: 'Cancelation successful. There will be no return value'
  }
  #swagger.responses[400] = {
    description: 'Cancelation failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const user = req.user;

  try {
    await ConnectionModel.findOneAndDelete({
      userIds: {
        $all: [user._id, req.params.receiverId]
      }
    });

    res.sendStatus(200);
  } catch {
    res.status(400).json({ err: 'Fail to cancel connection request.' });
  }
};
const acceptConnectionRequest = async (req, res) => {
  /*
  #swagger.description = 'Accept a connection request, you will receive 200 when Accepted.'
  #swagger.responses[200] = {
    description: 'Accept successfully. There will be no return value'
  }
  #swagger.responses[400] = {
    description: 'Accept failed, it might be caused by anything. You will receive an err message.',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const user = req.user;
  try {
    const connection = await ConnectionModel.findOne({
      userIds: { $all: [user._id, req.params.receiverId] }
    });
    await ConnectionModel.findByIdAndUpdate(connection._id, req.body);

    res.sendStatus(200);
  } catch {
    res.status(400).json({ err: 'Fail to accpet connection request.' });
  }
};

const getAllConnections = async (req, res) => {
  /*
  #swagger.description = 'Get all the connections including the ones you have not accepted.'
  #swagger.responses[200] = {
    description: 'Successfully retrieved all connections. You will receive an array of connection objects',
    schema: { $ref: '#/definitions/Connection' }
  }
  #swagger.responses[400] = {
    description: 'Falied to retrieve all connections. You will receive an err message',
    schema: { $ref: '#/definitions/Err' }
  }
  */
  const user = req.user;
  // const existedConnectionsIds = [
  //   ...new Set(flatten(existedConnections.map((c) => c.userIds))),
  //   user._id.toString()
  // ];

  try {
    const connections = await ConnectionModel.find({ userIds: user._id });
    const sentConnectionRequests = connections
      .filter((c) => c.accepted == false && c.senderId == user._id)
      .map((c) => c.receiverId);
    const receivedConnectionRequests = connections
      .filter((c) => c.accepted == false && c.receiverId == user._id)
      .map((c) => c.senderId);

    const connectionIds = [...new Set(flatten(connections.map((c) => c.userIds)))].filter(
      (c) => c != user._id
    );

    const users = await UserModel.find({ _id: connectionIds });

    const newUsers = users.map((u) => {
      let container = u;
      container.status = receivedConnectionRequests.includes(container._id.toString())
        ? 'sender'
        : sentConnectionRequests.includes(container._id.toString())
        ? 'receiver'
        : 'connected';
      return container;
    });

    res.status(200).json(newUsers);
  } catch {
    res.status(400).json({ err: 'Fail to get all connections.' });
  }
};

module.exports = {
  getSuggestedConnections,
  sendConnectionRequest,
  cancelConnectionRequest,
  acceptConnectionRequest,
  getAllConnections
};
