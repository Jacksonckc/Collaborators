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
      setAllPosts(await getAllPosts());
      setUserData(await getUserData());
    };
    init();
  }, [navigate, isLoading]);

  const handleCreatePost = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const result = await createPost(postCaption);
      result?.err && setErrMessage(result.err);
      setPostCaption(null);
      setIsLoading(false);
    }, 2000);
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
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',

          alignItems: 'start',
          marginTop: '40px'
        }}>
        <Container></Container>

        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
          <Card
            style={{ margin: 'auto', backgroundColor: '	#F5F5F5', maxWidth: 505, width: '100%' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                  {userData?.userFirstName[0] + userData?.userLastName[0]}
                </Avatar>
              }
              title={`${userData?.userFirstName ? userData.userFirstName : 'User'} says:`} // This will be the author name
            />

            <TextField
              style={{ width: '98%', padding: '1%' }}
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
        <Container
          style={{
            maxWidth: '300px',
            padding: '0',
            margin: ' 0 auto',
            position: 'sticky',
            top: '108.5px'
          }}>
          <SuggestedConnections />
        </Container>
      </Container>
    </div>
  );
}
