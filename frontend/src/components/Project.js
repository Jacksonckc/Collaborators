import { Box } from '@mui/system';
import { Button } from '@mui/material';

const Project = ({ project }) => {
  return (
    <Box
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
      <h2>{project.projectName}</h2>
      <p>{project.projectDescription}</p>
      <p>{project.projectRewardAcorns}</p>
      <Button>Join!</Button>
    </Box>
  );
};

export default Project;
