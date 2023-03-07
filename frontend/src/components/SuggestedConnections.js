import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { getSuggestedConnections } from '../services';

import { Connection } from './index';

export default function SuggestedConnections() {
  const [suggestedConnectionsData, setSuggestedConnectionsData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      var result = await getSuggestedConnections();
      result?.err && alert(result.err);
      setSuggestedConnectionsData(result);
    };
    init();
  }, [navigate]);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px 10px 10px 15px'
      }}>
      <Typography>You might want to connect...</Typography>
      {suggestedConnectionsData &&
        suggestedConnectionsData.map((connectionRequestData, index) => (
          <Connection connectionRequestData={connectionRequestData} key={index} />
        ))}
    </Box>
  );
}
