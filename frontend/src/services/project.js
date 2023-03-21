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

const addProject = async (projectData) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };
  const method = 'POST';

  const body = JSON.stringify(projectData);
  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/project`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}

  return null;
};

const deleteProject = async (projectData) => {
  const headers = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')
  };

  const method = 'DELETE';
  const body = JSON.stringify(projectData);

  const options = {
    method,
    headers,
    body
  };

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/project`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {}
  return null;
};
export { getAllProjects, addProject, deleteProject };
