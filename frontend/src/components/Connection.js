import React from 'react';

import Box from '@mui/joy/Box';
import { InputAdornment, Button, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

import { sendConnectionRequest } from '../services';

export default function Connection({ SuggestedConnectionData, setIsConnecting }) {
  console.log(SuggestedConnectionData, setIsConnecting);
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <InputAdornment position='start'>
        <AccountCircle />
      </InputAdornment>
      <Typography fontSize={20}>{SuggestedConnectionData.userFirstName}</Typography>

      <Button
        variant='contained'
        color='success'
        endIcon={<SendIcon />}
        onClick={() => {
          sendConnectionRequest(SuggestedConnectionData._id);
        }}></Button>
    </Box>
  );
}
