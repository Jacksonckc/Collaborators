import { Box } from '@mui/system';
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { deleteProject } from '../services';

const Project = ({ project, userData, setShowBuffer }) => {
  const handleDeleteProject = async () => {
    const response = window.confirm('Are you sure you want to delete your project?');
    if (response) {
      setShowBuffer(true);
      setTimeout(async () => {
        const result = await deleteProject({
          projectId: project._id,
          projectAuthorId: project.projectAuthorId
        });
        result?.err && alert(result.err);
        setShowBuffer(false);
      }, 2000);
    } else return;
  };
  return (
    <Box
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
      <Box>
        <h2>Project: {project.projectName}</h2>
        <p>Description: {project.projectDescription}</p>
        {project.projectLink && (
          <a href={project.projectLink} target='_blank' rel='noreferrer'>
            Go to project repo!
          </a>
        )}
        <p>Rewards: {project.projectRewardAcorns}</p>
      </Box>
      {userData._id.toString() === project.projectAuthorId ? (
        <Button onClick={handleDeleteProject}>
          Remove Project
          <DeleteForeverIcon />
        </Button>
      ) : (
        <Button>Join!</Button>
      )}
    </Box>
  );
};

export default Project;
