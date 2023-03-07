import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { getSuggestedConnections } from '../services';

import { Connection } from './index';

export default function SuggestedConnections() {
  const [suggestedConnectionsData, setSuggestedConnectionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        var result = await getSuggestedConnections();
        // once authed, set states
        setSuggestedConnectionsData(result);
      } catch (e) {
        alert(e);
      }
    };
    init();
  }, [navigate, isLoading]);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px'
      }}>
      {suggestedConnectionsData &&
        suggestedConnectionsData.map((SuggestedConnectionData, index) => (
          <Connection
            SuggestedConnectionData={SuggestedConnectionData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            key={index}
          />
        ))}
    </Box>
  );
}
