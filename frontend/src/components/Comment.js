import React, { useState, useEffect } from 'react';

import { TextField, Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { getOtherUserData, deleteComment } from '../services';

export default function Comment({ commentData, userData, postData, setIsLoadingComments }) {
  const [commenterData, setCommenterData] = useState(null);
  useEffect(() => {
    const init = async () => {
      // if no token, not authed

      var result = await getOtherUserData(commentData.commenterId);
      // once authed, set states
      setCommenterData(result);
    };
    init();
  }, [commentData.commenterId]);

  const handleDeleteComment = async () => {
    setIsLoadingComments(true);
    setTimeout(async () => {
      const result = await deleteComment({
        commenterId: commentData.commenterId,
        authorId: postData.authorId,
        commentId: commentData._id
      });
      result?.err && alert(result.err);
      setIsLoadingComments(false);
    });
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: '5px'
      }}>
      <Box style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Avatar src={commenterData?.userAvatarImg} style={{ width: '30px', height: '30px' }}>
          {commenterData?.userFirstName[0] + commenterData?.userLastName[0]}
        </Avatar>
        <Typography>{commentData.commentContent}</Typography>
      </Box>

      {userData._id === commentData.commenterId || postData.authorId === userData._id ? (
        <Button onClick={handleDeleteComment}>
          <DeleteOutlineIcon />
        </Button>
      ) : (
        console.log(false)
      )}
    </Box>
  );
}
