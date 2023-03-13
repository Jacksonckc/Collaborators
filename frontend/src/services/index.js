import {
  getSuggestedConnections,
  sendConnectionRequest,
  cancelConnectionRequest,
  acceptConnectionRequest,
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
  acceptConnectionRequest,
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
