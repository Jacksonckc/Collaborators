import React, { useState } from 'react';

import Box from '@mui/joy/Box';
import { InputAdornment, Button, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

import { sendConnectionRequest } from '../services';

export default function Connection({ SuggestedConnectionData, isLoading, setIsLoading }) {
  const [success, setSuccess] = useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700]
      }
    })
  };

  const handleSendConnectionRequest = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        await sendConnectionRequest(SuggestedConnectionData._id);
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      setIsLoading(false);
      alert(e);
    }
  };

  const handleButtonClick = () => {
    if (!isLoading) {
      setSuccess(false);
      setIsLoading(true);
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 2000);
    }
  };
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

      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant='contained'
          disabled={isLoading}
          onClick={handleButtonClick}
          endIcon={<SendIcon />}
          sx={buttonSx}></Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px'
            }}
          />
        )}
      </Box>
    </Box>
  );
}
