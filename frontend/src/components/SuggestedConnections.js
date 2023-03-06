import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { getSuggestedConnections } from '../services';
import { checkAuthByToken } from '../utils';
import { Connection } from './index';

export default function SuggestedConnections() {
  const [suggestedConnectionsData, setSuggestedConnectionsData] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      // if no token, not authed
      checkAuthByToken(navigate);

      var result = await getSuggestedConnections();
      // once authed, set states
      setSuggestedConnectionsData(result);
    };
    init();
  }, [navigate]);

  // console.log(suggestedConnectionsData);

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
        suggestedConnectionsData.map((SuggestedConnectionData) => (
          <Connection
            SuggestedConnectionData={SuggestedConnectionData}
            setIsConnecting={setIsConnecting}
          />
        ))}
    </Box>
  );
}
