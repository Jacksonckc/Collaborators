const {
  getUsers,
  getUser,
  addUser,
  changeUserInfo,
  deleteUser,
  loginUser,
  updateUserPassword
} = require('./userControllers');

const { getUserPosts, createPost, getAllPosts } = require('./postControllers');
module.exports = {
  getUsers,
  getUser,
  addUser,
  changeUserInfo,
  deleteUser,
  loginUser,
  updateUserPassword,
  getUserPosts,
  createPost,
  getAllPosts
};
