import {
  getSuggestedConnections,
  sendConnectionRequest,
  cancelConnectionRequest,
  getAllConnections
} from './connection';
import {
  registerUser,
  loginUser,
  getUserData,
  getOtherUserData,
  updateUserData,
  deleteUser,
  updateUserPassword
} from './user';
import { getAllPosts, getUserPosts, createPost, updatePost, deletePost } from './post';

export {
  getSuggestedConnections,
  sendConnectionRequest,
  cancelConnectionRequest,
  getAllConnections,
  registerUser,
  loginUser,
  getUserData,
  getOtherUserData,
  updateUserData,
  deleteUser,
  updateUserPassword,
  getAllPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost
};
