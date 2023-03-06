import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';

import Textarea from '@mui/joy/Textarea';

export default function AddComment() {
  return (
    <FormControl>
      {/* <FormLabel>Your comment</FormLabel> */}
      <Textarea
        placeholder='Perhaps your comment is better than the post...'
        minRows={2}
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
            <Button sx={{ ml: 'auto' }}>Send</Button>
          </Box>
        }
        sx={{
          minWidth: 300
        }}
      />
    </FormControl>
  );
}
