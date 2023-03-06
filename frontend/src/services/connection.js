const getSuggestedConnections = async () => {
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/connection/suggested`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const sendConnectionRequest = async (receiverId) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const body = JSON.stringify({ receiverId });
  const method = 'POST';

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/connection`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

export { getSuggestedConnections, sendConnectionRequest };
