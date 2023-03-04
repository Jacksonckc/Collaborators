import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';
import { Container } from '@mui/system';

import { Header } from '../components';
import { getUserData, updateUserData } from '../services';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userBirthday, setUserBirthday] = useState(null);
  const [userStory, setUserStory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      // if no token, not authed
      const token = localStorage.getItem('token');
      !token && navigate('/login');

      // if token expired, not authed
      const result = await getUserData();
      result.err && localStorage.removeItem('token') && navigate('/login');

      // once authed, set states
      setUserData(result);
      setUserFirstName(result.userFirstName);
      setUserLastName(result.userLastName);
      setUserEmail(result.userEmail);
      setUserPhone(result.userPhone);
      setUserBirthday(result.userBirthday);
      setUserStory(result.userStory);
    };
    init();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await updateUserData({
        userFirstName,
        userLastName,
        userEmail,
        userPhone,
        userBirthday,
        userStory
      });

      result.err ? alert(result.err) : alert('Your information has been updated!');
      window.location.reload();
    } catch (e) {
      alert(e);
    }
  };

  const handleChangePassword = async (event) => {};

  const constainerStyle = {
    marginTop: '30px',
    width: '50vw',
    minWidth: '350px',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div>
      <Header />
      {userData && (
        <Container style={constainerStyle} component='form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={userFirstName}
                label='First Name: '
                fullWidth
                required
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={userLastName}
                label='Last Name: '
                fullWidth
                required
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={userEmail}
                label='Email: '
                fullWidth
                required
                onChange={(e) => setUserEmail(e.target.value)}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={userPhone}
                label='Phone: '
                fullWidth
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={userBirthday}
                label='Birthday: '
                fullWidth
                onChange={(e) => setUserBirthday(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                defaultValue={userStory}
                label='Story: '
                fullWidth
                onChange={(e) => setUserStory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                defaultValue={userData.userProjectCount}
                label='Project Count: '
                InputProps={{
                  readOnly: true
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                defaultValue={userData.acorns}
                label='Acorns: '
                InputProps={{
                  readOnly: true
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                defaultValue={userData.userLevel === 1 ? 'User' : 'Admin'}
                label='User Level: '
                InputProps={{
                  readOnly: true
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type='submit' variant='outlined' color='success' endIcon={<SendIcon />}>
            Update
          </Button>
          <Button variant='outlined' color='primary' onClick={handleChangePassword}>
            Change Password
          </Button>
          <Button variant='contained' color='error' startIcon={<DeleteIcon />}>
            Delete Account
          </Button>
        </Container>
      )}
    </div>
  );
}
