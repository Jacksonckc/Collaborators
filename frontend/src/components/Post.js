import React, { useEffect, useState } from 'react';
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
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Box, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { AddComment } from './index';
import { getUserData, getOtherUserData, updatePost, deletePost } from '../services';

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
  const [userData, setUserData] = useState(null);
  const [postAuthorData, setPostAuthorData] = useState(null);
  const [newPostCaption, setNewPostCaption] = useState('new');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const init = async () => {
      // if no token, not authed

      var result = await getUserData();
      // once authed, set states
      setUserData(result);
      result = await getOtherUserData(props.postData.authorId);
      setPostAuthorData(result);
    };
    init();
  }, [props.postData.authorId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleDeletePost = async () => {
    const response = window.confirm('Are you sure you want to delete your post?');
    if (response) {
      try {
        props.setIsLoading(true);

        setTimeout(async () => {
          const result = await deletePost(props.postData._id);

          result?.err && alert(result.err);

          props.setIsLoading(false);
        }, 3000);
      } catch (e) {
        alert(e);
      }
    } else return;
  };

  const handleConfirmEdit = async () => {
    props.setIsLoading(true);
    setTimeout(async () => {
      const result = await updatePost(props.postData._id, newPostCaption);
      result?.err && alert(result.err);
      props.setIsLoading(false);
      setIsEditing(false);
    }, 3000);
  };

  return (
    <Card sx={{ maxWidth: 505, width: '100%' }} style={{ margin: 'auto' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {postAuthorData?.userFirstName[0] + postAuthorData?.userLastName[0]}
          </Avatar>
        }
        action={
          userData &&
          userData._id === props.postData.authorId && (
            // <Box>
            //   <IconButton aria-label='settings' onClick={handleOpenSettings}>
            //     <MoreVertIcon />
            //   </IconButton>
            //   <Menu
            //     anchorEl={anchorSettings}
            //     open={Boolean(anchorSettings)}
            //     onClose={handleCloseSettings}
            //     anchorOrigin={{
            //       vertical: 'bottom',
            //       horizontal: -70
            //     }}
            //     keepMounted>
            //     <MenuItem key={1} >
            //       <Typography textAlign='center'>Delete Post</Typography>
            //     </MenuItem>
            //   </Menu>
            // </Box>
            <Button color='error' onClick={handleDeletePost}>
              <DeleteIcon />
            </Button>
          )
        }
        title={postAuthorData?.userFirstName} // This will be the author name
        subheader={props.postData.postDate}
      />
      <CardContent>
        {isEditing ? (
          <Box
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
            <TextField
              style={{ width: '100%' }}
              defaultValue={props.postData.postCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}></TextField>
            <Button onClick={handleConfirmEdit}>
              {props.isLoading ? <CloudUploadIcon /> : <ModeEditIcon />}
            </Button>
          </Box>
        ) : (
          <Typography variant='body2' color='text.secondary' onClick={() => setIsEditing(true)}>
            {props.postData.postCaption}
          </Typography>
        )}
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
            // needs to create a comment comp
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
