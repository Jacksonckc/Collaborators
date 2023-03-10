import React, { useState } from 'react';

import Box from '@mui/joy/Box';
import { Button, Typography, Avatar } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

import { sendConnectionRequest, cancelConnectionRequest } from '../services';

export default function SuggestedConnection({ connectionRequestData }) {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buttonSx = {
    ...(sent && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700]
      }
    })
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      if (sent) {
        const result = await cancelConnectionRequest(connectionRequestData._id);
        if (result?.err) alert(result.err);
        else setSent(!sent);
      } else {
        const result = await sendConnectionRequest(connectionRequestData._id);
        if (result?.err) alert(result.err);
        else setSent(!sent);
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',

        justifyContent: 'space-between'
      }}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'space-between'
        }}>
        <Avatar
          style={{
            height: '30px',
            width: '30px',
            fontSize: '15px'
          }}
          src={connectionRequestData.userAvatarImg}>
          {(
            connectionRequestData?.userFirstName[0] + connectionRequestData?.userLastName[0]
          ).toUpperCase()}
        </Avatar>
        <Typography fontSize={20}>{connectionRequestData.userFirstName}</Typography>
      </Box>

      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant='contained'
          disabled={isLoading}
          onClick={handleButtonClick}
          style={{ display: 'flex', justifyContent: 'space-between' }}
          endIcon={sent ? <CancelIcon /> : <SendIcon />}
          sx={buttonSx}></Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '53%',
              marginTop: '-12px',
              marginLeft: '-12px'
            }}
          />
        )}
      </Box>
    </Box>
  );
}
