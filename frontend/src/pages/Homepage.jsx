import React, { useState } from 'react';
import { Button, Typography, Container, Box, IconButton } from '@mui/material';
import { Settings, Notifications } from '@mui/icons-material';

import logo from '../assets/QuesLogo 1 (1).png';
import podcast from '../assets/cuate.png';

import CreateProjectModal from '../components/CreateProjectModel';
import styles from '../styles/homepage.module.css';

export default function Homepage() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
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

      <Box className={styles.content}>
        <Typography variant="h3" className={styles.title} align="center">
          Create a New Project
        </Typography>
        <Box className={styles.imageContainer}>
          <img src={podcast} alt="Illustration" className={styles.illustration} />
        </Box>
        <Typography variant="body1" align="center" className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles.createButton}
          size="large"
          onClick={handleOpenModal}
        >
          + Create New Project
        </Button>
      </Box>
      <CreateProjectModal open={openModal} handleClose={handleCloseModal} />
    </Container>
  );
}
