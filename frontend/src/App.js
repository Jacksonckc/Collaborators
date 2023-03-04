import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage, LoginPage, Profile, ProjectGallaryPage, RegisterPage } from './views';
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
      path: '/projects',
      element: <ProjectGallaryPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    {
      path: '/profile',
      element: <Profile />
    }
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
