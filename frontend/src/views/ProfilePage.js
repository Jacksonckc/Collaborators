import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Grid, Popover, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';

import { Header } from '../components';
import { getUserData, updateUserData, deleteUser, updateUserPassword } from '../services';
import { checkAuthByToken } from '../utils';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userBirthday, setUserBirthday] = useState(null);
  const [userStory, setUserStory] = useState(null);
  const [userAvatarImg, setuserAvatarImg] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      // if no token, not authed
      checkAuthByToken(navigate);

      const result = await getUserData();

      // once authed, set states
      setUserData(result);
      setUserFirstName(result.userFirstName);
      setUserLastName(result.userLastName);
      setUserEmail(result.userEmail);
      setUserPhone(result.userPhone);
      setUserBirthday(result.userBirthday);
      setUserStory(result.userStory);
      setuserAvatarImg(result.userAvatarImg);
    };
    init();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await updateUserData({
      userFirstName,
      userLastName,
      userEmail,
      userPhone,
      userBirthday,
      userStory,
      userAvatarImg
    });

    if (result?.err) alert(result.err);
    else {
      alert('Your information has been updated!');
      window.location.reload();
    }
  };

  const handleChangePassword = async () => {
    const response = window.confirm(
      'Are you sure you want to change your password? You will be required to login using your new password after this operation.'
    );
    if (response) {
      try {
        await updateUserPassword(newPassword);
        localStorage.removeItem('token');
        window.location.reload();
      } catch (e) {
        alert(e);
      }
    } else setAnchorEl(null);
  };

  const handleDeleteAccount = async () => {
    const response = window.confirm('Are you sure you want to delete your account?');
    if (response) {
      try {
        await deleteUser();
        window.location.reload();
      } catch (e) {
        alert(e);
      }
    } else return;
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const constainerStyle = {
    marginTop: '30px',
    width: '50vw',
    minWidth: '350px',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
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
            <Grid item xs={12}>
              <TextField
                // multiline
                defaultValue={userAvatarImg}
                label='Avatar Img: '
                fullWidth
                onChange={(e) => setuserAvatarImg(e.target.value)}
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
          <Button variant='outlined' color='primary' onClick={handleOpenPopover}>
            Change Password
          </Button>
          <Popover
            open={open}
            onClose={handleClosePopover}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                // position: 'absolute',
                textAlign: 'center',
                width: '300px',
                padding: '10px',
                gap: '10px'
              }}>
              <label htmlFor='newPassword' style={{ fontSize: '25px' }}>
                New Password:
              </label>
              <TextField id='newPassword' onChange={(e) => setNewPassword(e.target.value)} />
              <Button onClick={handleChangePassword}>Confirm Change</Button>
            </Box>
          </Popover>

          <Button
            variant='contained'
            color='error'
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Container>
      )}
    </Box>
  );
}
