const getLikeByPostId = async (postId) => {
  const headers = {
    accept: 'application/json',
    authorization: localStorage.getItem('token')
  };
  const method = 'GET';

  const options = {
    method,
    headers
  };
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/postLike/${postId}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};
const getPostLikeCountByPostId = async (postId) => {
  const headers = {
    accept: 'application/json',
    authorization: localStorage.getItem('token')
  };
  const method = 'GET';

  const options = {
    method,
    headers
  };
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/postLike/all/${postId}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const likePost = async (postId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const body = JSON.stringify({ postId });
  const method = 'POST';

  const options = {
    method,
    headers,
    body
  };
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/postLike`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const unLikePost = async (postId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const method = 'DELETE';
  const body = JSON.stringify({ postId });

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/postLike`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}
  return null;
};

export { getLikeByPostId, getPostLikeCountByPostId, likePost, unLikePost };
