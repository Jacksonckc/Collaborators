import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography, Paper } from '@mui/material';

import { Header, Connection } from '../components';
import { getAllConnections } from '../services';
import { checkAuthByToken } from '../utils';

export default function MyConnectionsPage() {
  const [allConnections, setAllConnections] = useState();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      checkAuthByToken(navigate);
      setAllConnections(await getAllConnections());
    };
    init();
  }, [navigate, updating]);

  return (
    <div>
      <Header />
      <Typography color='#1876D1' style={{ textAlign: 'center', padding: '10px' }}>
        {allConnections?.length > 0
          ? 'You have connections with...'
          : 'No connection! Go make one!'}
      </Typography>
      <Paper style={{ maxWidth: '600px', margin: 'auto' }}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',

            borderRadius: '5px'
          }}>
          {allConnections?.map(
            (connectionData, index) =>
              connectionData.status === 'receiver' && (
                <Connection connectionData={connectionData} key={index} setUpdating={setUpdating} />
              )
          )}
          {allConnections?.map(
            (connectionData, index) =>
              connectionData.status === 'sender' && (
                <Connection connectionData={connectionData} key={index} setUpdating={setUpdating} />
              )
          )}

          {allConnections?.map(
            (connectionData, index) =>
              connectionData.status !== 'sender' &&
              connectionData.status !== 'receiver' && (
                <Connection connectionData={connectionData} key={index} setUpdating={setUpdating} />
              )
          )}
        </Box>
      </Paper>
    </div>
  );
}
