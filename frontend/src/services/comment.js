const getAllCommentsByPostId = async (postId) => {
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/comment/${postId}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const addCommentToPost = async (commentData) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const body = JSON.stringify(commentData);
  const method = 'POST';

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/comment`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};
const deleteComment = async (bodyData) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const body = JSON.stringify(bodyData);
  const method = 'DELETE';

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/comment`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

export { getAllCommentsByPostId, addCommentToPost, deleteComment };
