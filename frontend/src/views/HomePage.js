import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../components';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    !token && navigate('/login');
  });

  return (
    <div>
      <Header />
      Home
    </div>
  );
}
