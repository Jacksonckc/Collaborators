import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  HomePage,
  LoginPage,
  MyConnectionsPage,
  MyPostsPage,
  ProfilePage,
  RegisterPage
} from './views';

import './App.css';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/myConnections',
      element: <MyConnectionsPage />
    },
    {
      path: '/myPosts',
      element: <MyPostsPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    }
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
