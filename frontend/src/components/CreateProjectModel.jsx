import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

import styles from '../styles/CreateProjectModel.module.css';
import { api } from '../config/api';

export default function CreateProjectModal({ open, handleClose, fetchProjects }) {
  const token = localStorage.getItem('token');
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async () => {
    try {
      if (!projectName) {
        Swal.fire({
          icon: 'error',
          title: 'Project Creation',
          text: 'Please type the project name',
          confirmButtonText: 'OK'
        });
      } else {
        const response = await axios.post(`${api.url2}/`,
          {
            projectName: projectName
          }, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

        const projectId = response.data.project._id;

        Swal.fire({
          icon: 'success',
          title: 'Project Creation',
          text: 'You have successfully created a Project',
          confirmButtonText: 'OK'
        });
        handleClose();
        setProjectName('');
        fetchProjects();
      }
    } catch (error) {
      console.error('Error creating project:', error);
      Swal.fire({
        icon: 'error',
        title: 'Project Creation',
        text: 'An error occurred while creating the project',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className={styles.createmodel}
        PaperProps={{
            style: {
            width: '70%',
            maxWidth: 'none',
            },
        }}
    >
      <DialogTitle className={styles.title}>Create Project</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Enter Project Name:</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type here"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          error={!!error}
          margin="dense"
          helperText={projectName.length !== 0 ? "":"Project Name Can't be empty"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary" variant="contained" className={styles.buttonsubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}