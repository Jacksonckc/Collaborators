const getAllPosts = async () => {
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/post/all`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const getUserPosts = async () => {
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/post`;
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch {}

  return null;
};

const createPost = async (postCaption) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const body = JSON.stringify({ postCaption });
  const method = 'POST';

  const options = {
    method,
    headers,
    body
  };
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/post`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const updatePost = async (postId, postCaption) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const method = 'PUT';
  const body = JSON.stringify({ postCaption });

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/post/${postId}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}
  return null;
};

const deletePost = async (postId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const method = 'DELETE';

  const options = {
    method,
    headers
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/post/${postId}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}
  return null;
};
export { getAllPosts, getUserPosts, createPost, updatePost, deletePost };
