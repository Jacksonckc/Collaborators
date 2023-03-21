import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Box, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Header, Project, LinearBuffer } from '../components';
import { getAllProjects, getUserData, addProject } from '../services';
import { checkAuthByToken } from '../utils';

const ProjectGalleryPage = () => {
  const [allProjects, setAllProjects] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isMakingProject, setIsMakingProject] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [showBuffer, setShowBuffer] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [projectLink, setProjectLink] = useState(null);
  const [projectRewardAcorns, setProjectRewardAcorns] = useState(null);

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
  }, [navigate, showBuffer]);

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrMessage(null);
  };

  const handleCreateProject = async () => {
    setShowBuffer(true);
    const projectData = {
      projectName,
      projectDescription,
      projectRewardAcorns,
      projectLink,
      projectAuthorId: userData._id
    };
    setTimeout(async () => {
      const result = await addProject(projectData); // need to call a service for this
      if (result?.err) setErrMessage(result.err);
      else {
        setIsMakingProject(false);
        alert('You have added a project!');
      }
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
              onChange={(e) => setProjectName(e.target.value)}
              required
              label='Project Name'
            />
            <TextField
              label='Project Description'
              required
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            <TextField label='Project Link' onChange={(e) => setProjectLink(e.target.value)} />
            <TextField
              label='Project Reward Acorns'
              required
              onChange={(e) => setProjectRewardAcorns(e.target.value)}
            />
            <Button onClick={handleCreateProject}>Start Project!</Button>
          </Box>
        ) : (
          <Carousel animation='slide' height={500}>
            {userData &&
              allProjects?.map((project, i) => (
                <Project
                  key={i}
                  project={project}
                  userData={userData}
                  setShowBuffer={setShowBuffer}
                />
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
