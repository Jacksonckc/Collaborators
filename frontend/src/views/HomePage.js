import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, LinearBuffer, Post, SuggestedConnections } from '../components';
import { getUserData, getAllPosts, createPost } from '../services';
import { checkAuthByToken } from '../utils';
import { Container, Card, CardHeader, TextField, Button, Snackbar, Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

export default function HomePage() {
  const [allPosts, setAllPosts] = useState();
  const [postCaption, setPostCaption] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      checkAuthByToken(navigate);
      try {
        var result = await getAllPosts();
        setAllPosts(result);

        result = await getUserData();
        // once authed, set states
        setUserData(result);
      } catch {}
      return;
    };
    init();
  }, [navigate, isLoading]);

  const handleCreatePost = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const result = await createPost(postCaption);
        if (result?.err) {
          setErrMessage(result.err);
        } else {
          setPostCaption(null);
        }
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrMessage(null);
  };

  return (
    <div>
      <Snackbar
        open={errMessage != null}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
          {errMessage}
        </Alert>
      </Snackbar>
      <Header />
      <Container
        style={{
          display: 'flex',
          marginTop: '40px'
        }}>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
          <Card
            sx={{ maxWidth: 505, width: '100%' }}
            style={{ margin: 'auto', backgroundColor: '	#F5F5F5' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                  {userData?.userFirstName[0]}
                </Avatar>
              }
              title={`${userData?.userFirstName ? userData.userFirstName : 'User'} says:`} // This will be the author name
            />
            <TextField
              style={{ width: '98%', padding: '1%' }}
              multiline
              label='Caption'
              placeholder='Tell us what is on your mind...'
              required
              onChange={(e) => setPostCaption(e.target.value)}
            />

            <Button
              style={{ display: 'block', margin: '5px 10px 10px auto ' }}
              variant='contained'
              onClick={handleCreatePost}
              disabled={isLoading}>
              Add Post
            </Button>
          </Card>
          {isLoading && <LinearBuffer />}
          {allPosts &&
            allPosts.map((postData) => (
              <Post postData={postData} key={postData._id} setIsLoading={setIsLoading} />
            ))}
        </Container>

        <Container style={{ maxWidth: '200px', padding: '0' }}>
          <SuggestedConnections />
        </Container>
      </Container>
    </div>
  );
}
