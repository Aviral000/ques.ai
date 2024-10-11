import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import styles from '../styles/createyoutube.module.css';
import image2 from '../assets/image 2.png';

export default function CreateYoutube({ open, handleClose }) {
  const [projectName, setProjectName] = useState('');
  const [link, setLink] = useState('');
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!projectName || !link || !transcription) {
      setError("All fields are required!");
    } else {
      console.log('Project Created:', { projectName, link, transcription });
      setError('');
      handleClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      className={styles.createmodel}
      PaperProps={{
        style: {
          width: '70%',
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle className={styles.title}>
        <div>Upload from Youtube</div>
        <div className='styles.img2'>
          <img src={image2} alt="Upload Icon" />
        </div>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1">Enter Name:</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type here"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          error={!!error}
          margin="dense"
        />
        
        <Typography variant="body1">Link:</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          error={!!error}
          margin="dense"
        />
        
        <Typography variant="body1">Transcription:</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Type here"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          error={!!error}
          margin="dense"
        />
        
        {error && (
          <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
            {error}
          </Typography>
        )}
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