import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Post } from '../components';
import { getAllPosts } from '../services';
import { checkAuthByToken } from '../utils';
import { Container } from '@mui/material';

export default function HomePage() {
  const [allPosts, setAllPosts] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      checkAuthByToken(navigate);

      const result = await getAllPosts();
      setAllPosts(result);
    };
    init();
  }, [navigate]);

  return (
    <div>
      <Header />
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '40px'
        }}>
        {allPosts && allPosts.map((postData) => <Post postData={postData} />)}
      </Container>
    </div>
  );
}
