import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Textarea from '@mui/joy/Textarea';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Menu, MenuItem, Box } from '@mui/material';

import { AddComment } from './index';
import { getUserData, getOtherUserData, deletePost } from '../services';
import { checkAuthByToken } from '../utils';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [anchorSettings, setAnchorSettings] = useState(null);
  const [userData, setUserData] = useState(null);
  const [postAuthorData, setPostAuthorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      // if no token, not authed
      checkAuthByToken(navigate);

      var result = await getUserData();
      // once authed, set states
      setUserData(result);
      result = await getOtherUserData(props.postData.authorId);
      setPostAuthorData(result);
    };
    init();
  }, [navigate, props.postData.authorId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleOpenSettings = (event) => {
    setAnchorSettings(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorSettings(null);
  };

  const handleDeletePost = async () => {
    const response = window.confirm('Are you sure you want to delete your post?');
    if (response) {
      try {
        props.setIsLoading(true);
        handleCloseSettings();
        setTimeout(async () => {
          const result = await deletePost(props.postData._id);
          if (result?.err) {
            alert(result.err);
          }
          props.setIsLoading(false);
        }, 3000);
      } catch (e) {
        alert(e);
      }
    } else return;
  };

  return (
    <Card sx={{ maxWidth: 505, width: '100%' }} style={{ margin: 'auto' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {postAuthorData?.userFirstName[0]}
          </Avatar>
        }
        action={
          userData && userData._id === props.postData.authorId ? (
            <Box>
              <IconButton aria-label='settings' onClick={handleOpenSettings}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorSettings}
                open={Boolean(anchorSettings)}
                onClose={handleCloseSettings}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: -70
                }}
                keepMounted>
                <MenuItem key={1} onClick={handleDeletePost}>
                  <Typography textAlign='center'>Delete Post</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box></Box>
          )
        }
        title={postAuthorData?.userFirstName} // This will be the author name
        subheader={props.postData.postDate}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {props.postData.postCaption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={handleLikeClick}>
          {liked ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteIcon />}
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Box style={{ margin: '5px' }}>
          <AddComment />
        </Box>
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          {props.postData.postComments?.map((comment, index) => (
            <TextField
              key={index}
              style={{ width: '100%' }}
              defaultValue={comment}
              variant='standard'
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
