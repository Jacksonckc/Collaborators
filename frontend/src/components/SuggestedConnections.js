import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

import { getSuggestedConnections } from '../services';

import { SuggestedConnection } from './index';

export default function SuggestedConnections() {
  const [suggestedConnectionsData, setSuggestedConnectionsData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      var result = await getSuggestedConnections();
      result?.err && console.log(result.err);
      setSuggestedConnectionsData(result);
    };
    init();
  }, [navigate]);

  return (
    <Paper>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderRadius: '5px',
          padding: '10px 10px 10px 15px'
        }}>
        <Typography color='#1876D1'>
          {suggestedConnectionsData?.length > 0
            ? 'You might want to connect...'
            : 'No suggested connections.'}
        </Typography>
        {suggestedConnectionsData?.map((connectionRequestData, index) => (
          <SuggestedConnection connectionRequestData={connectionRequestData} key={index} />
        ))}
      </Box>
    </Paper>
  );
}
