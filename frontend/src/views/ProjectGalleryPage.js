import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Box } from '@mui/material';

import { Header } from '../components';

const ProjectGalleryPage = () => {
  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!'
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!'
    },
    {
      name: 'Random Name #3',
      description: 'Hello World!'
    }
  ];

  return (
    <Box>
      <Header />
      <Box
        style={{ width: '50%', margin: '20px auto', backgroundColor: '#F5F5F5', height: '500px' }}>
        <Carousel animation='slide' height={500}>
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

function Item(props) {
  return (
    <Box
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button>Join!</Button>
    </Box>
  );
}

export { ProjectGalleryPage };
