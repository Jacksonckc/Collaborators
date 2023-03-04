const registerUser = async (userData) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify(userData);
  const method = 'POST';

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}
  return null;
};

const loginUser = async (userData) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const body = JSON.stringify(userData);

  const method = 'POST';

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data.token;
  } catch {}

  return null;
};

const getUserData = async () => {
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/user`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const updateUserData = async (userData) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const body = JSON.stringify(userData);
  const method = 'PUT';

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user`;
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch {}

  return null;
};
export { registerUser, loginUser, getUserData, updateUserData };
