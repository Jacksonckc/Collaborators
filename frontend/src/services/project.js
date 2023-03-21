const getAllProjects = async () => {
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/project`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

export { getAllProjects };
