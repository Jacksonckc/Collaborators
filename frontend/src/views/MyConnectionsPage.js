import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography, Paper } from '@mui/material';

import { Header, Connection } from '../components';
import { getAllConnections } from '../services';
import { checkAuthByToken } from '../utils';

export default function MyConnectionsPage() {
  const [allConnections, setAllConnections] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      checkAuthByToken(navigate);
      setAllConnections(await getAllConnections());
    };
    init();
  }, [navigate]);

  return (
    <div>
      <Header />
      <Typography color='#1876D1' style={{ textAlign: 'center' }}>
        {allConnections?.length > 0
          ? 'You have connections with...'
          : 'No connection! Go make one!'}
      </Typography>
      <Paper style={{ maxWidth: '500px', margin: 'auto' }}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',

            borderRadius: '5px',
            padding: '10px 10px 10px 15px'
          }}>
          {allConnections?.map((connectionData, index) => (
            <Connection connectionData={connectionData} key={index} />
          ))}
        </Box>
      </Paper>
    </div>
  );
}
