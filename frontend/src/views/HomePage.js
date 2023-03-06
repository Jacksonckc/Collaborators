import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Post } from '../components';
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
  }, [navigate]);

  const handleCreatePost = async () => {
    try {
      const result = await createPost(postCaption);

      result.err ? setErrMessage(result.err) : window.location.reload();
    } catch (e) {
      alert(e);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
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
          flexDirection: 'column',
          gap: '10px',
          marginTop: '40px'
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
            onClick={handleCreatePost}>
            Add Post
          </Button>
        </Card>

        {allPosts && allPosts.map((postData) => <Post postData={postData} key={postData._id} />)}
      </Container>
    </div>
  );
}
