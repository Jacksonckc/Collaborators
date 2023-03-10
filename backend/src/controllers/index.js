const {
  getSuggestedConnections,
  sendConnectionRequest,
  cancelConnectionRequest,
  acceptConnectionRequest,
  getAllConnections
} = require('./connectionControllers');
const {
  getUsers,
  getUser,
  addUser,
  changeUserInfo,
  deleteUser,
  loginUser,
  updateUserPassword,
  getOtherUser
} = require('./userControllers');

const {
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  getAllPosts
} = require('./postControllers');

module.exports = {
  getSuggestedConnections,
  sendConnectionRequest,
  cancelConnectionRequest,
  acceptConnectionRequest,
  getAllConnections,
  getUsers,
  getUser,
  addUser,
  changeUserInfo,
  deleteUser,
  loginUser,
  updateUserPassword,
  getOtherUser,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  getAllPosts
};
