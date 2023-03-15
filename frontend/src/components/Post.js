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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Box, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { AddComment, Comment } from './index';
import {
  getUserData,
  getOtherUserData,
  updatePost,
  deletePost,
  getAllCommentsByPostId
} from '../services';

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
  const [newPostCaption, setNewPostCaption] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [allComments, setAllComments] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    const init = async () => {
      // if no token, not authed

      var result = await getUserData();
      // once authed, set states
      setUserData(result);
      result = await getOtherUserData(props.postData.authorId);
      setPostAuthorData(result);
      result = await getAllCommentsByPostId(props.postData._id);
      // await result.sort((a, b) => {
      //   return new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime();
      // });
      // console.log(result);

      setAllComments(result);
    };
    init();
  }, [props.postData.authorId, props.postData._id, isLoadingComments]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleDeletePost = async () => {
    const response = window.confirm('Are you sure you want to delete your post?');
    if (response) {
      props.setIsLoading(true);
      setTimeout(async () => {
        const result = await deletePost(props.postData._id);

        result?.err && alert(result.err);

        props.setIsLoading(false);
      }, 3000);
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

  const handleClickToEdit = (e) => {
    if (userData?._id === props.postData.authorId) {
      setIsEditing(true);
      setNewPostCaption(props.postData.postCaption);
    }
  };

  return (
    <Card sx={{ maxWidth: 505, width: '100%' }} style={{ margin: 'auto' }}>
      <CardHeader
        avatar={
          <Avatar src={postAuthorData?.userAvatarImg}>
            {postAuthorData?.userFirstName[0] + postAuthorData?.userLastName[0]}
          </Avatar>
        }
        action={
          userData?._id === props.postData.authorId && (
            <Button color='error' onClick={handleDeletePost}>
              <DeleteIcon />
            </Button>
          )
        }
        title={postAuthorData?.userFirstName}
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
              onChange={(e) => setNewPostCaption(e.target.value)}
            />
            <Button onClick={handleConfirmEdit}>
              {props.isLoading ? <CloudUploadIcon /> : <ModeEditIcon />}
            </Button>
          </Box>
        ) : (
          <Typography
            variant='body2'
            color='text.secondary'
            onClick={(e) => handleClickToEdit(e)}
            style={{ cursor: 'pointer' }}>
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
          <AddComment postId={props.postData._id} setIsLoadingComments={setIsLoadingComments} />
        </Box>
        <CardContent>
          <Typography paragraph>
            {allComments?.length > 0 ? 'Comments:' : 'Be the first one to comment!'}
          </Typography>
          {allComments?.map((comment, index) => (
            <Comment
              commentData={comment}
              key={index}
              userData={userData}
              postData={props.postData}
              setIsLoadingComments={setIsLoadingComments}
            />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
