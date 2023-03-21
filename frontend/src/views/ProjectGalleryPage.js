import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Box, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Header, Project, LinearBuffer } from '../components';
import { getAllProjects, getUserData } from '../services';
import { checkAuthByToken } from '../utils';

const ProjectGalleryPage = () => {
  const [allProjects, setAllProjects] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isMakingProject, setIsMakingProject] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [showBuffer, setShowBuffer] = useState(false);
  const [projectName, setProjectName] = useState(false);
  const [projectDescription, setProjectDescription] = useState(false);
  const [projectRewardAcorns, setProjectRewardAcorns] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await checkAuthByToken(navigate);
      const result = await getAllProjects();
      const filteredResult = result.filter((p) => p.isProjectFinished !== true);
      setAllProjects(filteredResult);
      setUserData(await getUserData());
    };
    init();
  }, [navigate]);

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrMessage(null);
  };

  const handleCreateProject = async () => {
    setShowBuffer(true);
    const projectData = { projectName, projectDescription, projectRewardAcorns };
    setTimeout(async () => {
      const result = { err: 'NO!' }; // need to call a service for this
      result?.err && setErrMessage(result.err);

      setShowBuffer(false);
    }, 3000);
  };
  return (
    <Box>
      <Snackbar
        open={errMessage != null}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
          {errMessage}
        </Alert>
      </Snackbar>
      <Header />

      <Box
        style={{ width: '50%', margin: '50px auto', backgroundColor: '#F5F5F5', height: '500px' }}>
        {isMakingProject ? (
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
            <TextField
              placeholder='Project Name: '
              onChange={(e) => setProjectName(e.target.value)}
            />
            <TextField
              placeholder='Project Description: '
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            <TextField
              placeholder='Project Reward Acorns: '
              onChange={(e) => setProjectRewardAcorns(e.target.value)}
            />
            <Button onClick={handleCreateProject}>Start Project!</Button>
          </Box>
        ) : (
          <Carousel animation='slide' height={500}>
            {allProjects?.map((project, i) => (
              <Project key={i} project={project} />
            ))}
          </Carousel>
        )}
      </Box>
      {showBuffer && <LinearBuffer />}
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box>My Acorns: {userData?.acorns}</Box>
        <Button
          onClick={() => {
            setIsMakingProject(!isMakingProject);
          }}>
          {isMakingProject ? 'Cancel' : 'Make A Project'}
        </Button>
      </Box>
    </Box>
  );
};

export { ProjectGalleryPage };
