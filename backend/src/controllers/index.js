const { getAllCommentsByPostId, addCommentToPost, deleteComment } = require('./commentControllers');

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

const {
  getLikeByPostId,
  getPostLikeCountByPostId,
  likePost,
  unLikePost
} = require('./postLikeControllers');

const { getAllProjects, addProject, deleteProject } = require('./projectControllers');

module.exports = {
  getAllCommentsByPostId,
  addCommentToPost,
  deleteComment,
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
  getAllPosts,
  getLikeByPostId,
  getPostLikeCountByPostId,
  likePost,
  unLikePost,
  getAllProjects,
  addProject,
  deleteProject
};
