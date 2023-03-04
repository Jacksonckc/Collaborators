import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Post } from '../components';

import { checkAuthByToken } from '../utils';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthByToken(navigate);
  }, [navigate]);

  return (
    <div>
      <Header />
      <Post />
      Will have all the posts, a post has the author info, project info?, date and comments.
    </div>
  );
}
