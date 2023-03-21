import { getAllCommentsByPostId, addCommentToPost, deleteComment } from './comment';

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
import { getLikeByPostId, getPostLikeCountByPostId, likePost, unLikePost } from './postLike';
import { getAllProjects } from './project';

export {
  getAllCommentsByPostId,
  addCommentToPost,
  deleteComment,
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
  deletePost,
  getLikeByPostId,
  getPostLikeCountByPostId,
  likePost,
  unLikePost,
  getAllProjects
};
