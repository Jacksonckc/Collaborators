import { getUserData } from '../services';

const checkAuthByToken = async (callback) => {
  // if no token, not authed
  const token = localStorage.getItem('token');
  !token && callback('/login');

  // if token expired, not authed
  const result = await getUserData();
  if (result?.err) {
    localStorage.removeItem('token');
    callback('/login');
  }
};

export { checkAuthByToken };
