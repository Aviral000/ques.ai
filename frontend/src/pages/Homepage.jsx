import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box, IconButton } from '@mui/material';
import { Settings, Notifications } from '@mui/icons-material';

import logo from '../assets/QuesLogo 1 (1).png';
import podcast from '../assets/cuate.png';

import CreateProjectModal from '../components/CreateProjectModel';
import styles from '../styles/homepage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../config/api';

export default function Homepage() {
  const token = localStorage.getItem('token');
  const loggin = sessionStorage.getItem('loggin');
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${api.url2}/all`, { headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <>
      <Container className={styles.homepageContainer}>
        <Box className={styles.header}>
          <img src={logo} alt="Ques.AI Logo" className={styles.logo} />
          <Box className={styles.headerIcons}>
            <IconButton>
              <Settings />
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton>
          </Box>
        </Box>

        {projects.length === 0 ? (<Box className={styles.content}>
          <Typography variant="h3" className={styles.title} align="center">
            Create a New Project
          </Typography>
          <Box className={styles.imageContainer}>
            <img src={podcast} alt="Illustration" className={styles.illustration} />
          </Box>
          <Typography variant="body1" align="center" className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          </Typography>
          {loggin ? (<Button
            variant="contained"
            color="primary"
            className={styles.createButton}
            size="large"
            onClick={handleOpenModal}
          >
            + Create New Project
          </Button>) : (
          <Button
            variant="contained"
            color="primary"
            className={styles.createButton}
            size="large"
            onClick={() => navigate('login')}
            sx={{
              marginLeft: '5px'
            }}
          >
            Login
          </Button>)}
        </Box>) : (
          <>
            <div style={{ color: '#6D28D9' }}>
              <Typography variant='h2'>Projects</Typography>
            </div>
            <div className={styles.projectslist}>
              {projects.map((project) => (
                <div key={project._id} className={styles.projectcard} onClick={() => navigate(`/${project._id}/addpodcast`)}>
                  <div className={styles.projecticon}>{project.projectName.substring(0, 2).toUpperCase()}</div>
                  <div className="project-info">
                    <Typography variant="subtitle1" className={styles.projectname}>{project.projectName}</Typography>
                    <Typography variant="body2">{project.episodes.length} episodes</Typography>
                    <Typography variant="caption">Last edited on {project.updatedAt}</Typography>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenModal}
              >Add Project</Button>
            </div>
          </>
        )}
        <CreateProjectModal open={openModal} handleClose={handleCloseModal} navigate={navigate} fetchProjects={fetchProjects} />
      </Container>
    </>
  );
}
