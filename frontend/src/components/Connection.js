import React, { useState } from 'react';

import Box from '@mui/joy/Box';
import { Button, Typography, Avatar } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { cancelConnectionRequest, acceptConnectionRequest } from '../services';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function Connection({ connectionData, setUpdating }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelConnectionRequest = async () => {
    setIsLoading(true);
    setUpdating(true);
    setTimeout(async () => {
      const result = await cancelConnectionRequest(connectionData._id);
      if (result?.err) alert(result.err);

      setUpdating(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleAcceptConnectionRequest = async () => {
    setIsLoading(true);
    setUpdating(true);
    setTimeout(async () => {
      const result = await acceptConnectionRequest(connectionData._id);
      if (result?.err) alert(result.err);

      setUpdating(false);
      setIsLoading(false);
    }, 2000);
  };

  const generateButtons = () => {
    switch (connectionData.status) {
      case 'receiver':
        return (
          <Button
            variant='contained'
            disabled={isLoading}
            onClick={handleCancelConnectionRequest}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            endIcon={<CancelIcon />}
            sx={{
              bgcolor: green[500],
              '&:hover': {
                bgcolor: green[700]
              }
            }}
          />
        );
      case 'sender':
        return (
          <Button
            variant='contained'
            disabled={isLoading}
            onClick={handleAcceptConnectionRequest}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            endIcon={<PersonAddIcon />}
          />
        );
      default:
        return (
          <Button
            variant='contained'
            disabled={isLoading}
            onClick={handleCancelConnectionRequest}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            endIcon={<PersonRemoveIcon />}
            sx={{
              bgcolor: green[500],
              '&:hover': {
                bgcolor: green[700]
              }
            }}
          />
        );
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: connectionData.status === 'connected' && '#E2E0E0',
        padding: '10px 10px 10px 15px'
      }}>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Avatar src={connectionData?.userAvatarImg}>
          {connectionData?.userFirstName[0] + connectionData?.userLastName[0]}
        </Avatar>
        <Typography
          fontSize={
            20
          }>{`${connectionData.userFirstName}, ${connectionData.userLastName}`}</Typography>
      </Box>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Box>
          {connectionData?.status === 'sender'
            ? 'Accept request'
            : connectionData?.status === 'receiver'
            ? 'Cancel request'
            : 'Connected'}
        </Box>
        <Box sx={{ m: 1, position: 'relative' }}>
          {generateButtons()}
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
    </Box>
  );
}
