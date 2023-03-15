import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';

import { addCommentToPost } from '../services';

export default function AddComment({ postId, setIsLoadingComments }) {
  const [commentContent, setCommentContent] = useState(null);

  const handleAddComment = async () => {
    setIsLoadingComments(true);
    const result = await addCommentToPost({ postId, commentContent });
    if (result?.err) alert(result.err);
    setIsLoadingComments(false);
    setCommentContent(null);
  };

  return (
    <FormControl>
      <Textarea
        placeholder='Perhaps your comment is better than the post...'
        minRows={2}
        onChange={(e) => setCommentContent(e.target.value)}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto'
            }}>
            <Button sx={{ ml: 'auto' }} onClick={handleAddComment}>
              Send
            </Button>
          </Box>
        }
        sx={{
          minWidth: 300
        }}
      />
    </FormControl>
  );
}
