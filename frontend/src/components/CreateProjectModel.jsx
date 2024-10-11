import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

import styles from '../styles/CreateProjectModel.module.css'

export default function CreateProjectModal({ open, handleClose }) {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!projectName) {
      setError("Project Name Can't be empty");
    } else {
      console.log('Project Created:', projectName);
      setError('');
      handleClose();
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
