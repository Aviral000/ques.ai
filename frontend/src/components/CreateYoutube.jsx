import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import styles from '../styles/createyoutube.module.css';
import image2 from '../assets/image 2.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { api } from '../config/api';
import { useParams } from 'react-router-dom';

export default function CreateYoutube({ open, handleClose, fetchEpisodes }) {
  const [projectName, setProjectName] = useState('');
  const [link, setLink] = useState('');
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const { projectId } = useParams();

  const token = localStorage.getItem('token');

  const handleCreate = async () => {
    try {
      if (!projectName || !link || !transcription) {
        Swal.fire({
          icon: 'error',
          title: 'Episode Creation',
          text: 'Please fill all the columns',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Episode Creation',
          text: 'Episode created successfully',
          confirmButtonText: 'OK'
        });
        const response = await axios.post(`${api.url2}/${projectId}/episodes`,
        {
          title: projectName,
          link: link,
          description: transcription
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        handleClose();
        fetchEpisodes();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Episode Creation',
        text: error ? error : 'Error from the server',
        confirmButtonText: 'OK'
      });
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