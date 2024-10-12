import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MicIcon from '@mui/icons-material/Mic';
import DiamondIcon from '@mui/icons-material/Diamond';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from '../styles/userpage.module.css';
import logo from '../assets/QuesLogo 1 (1).png';

import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { api } from '../config/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../contextAPI/productProvider';

export default function UserPage() {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState('Username');
  const [email, setEmail] = useState('Email');
  const navigate = useNavigate();
  const [isEdited, setIsEdited] = useState(false);
  const { productId } = useContext(productContext);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${api.url}/user-info`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsername(response.data.data.username);
      setEmail(response.data.data.email);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(`${api.url2}/${productId}/episodes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setEpisodes(response.data.project.episodes)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchEpisodes();
  }, [])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsEdited(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${api.url}/edit-username`, 
        { username: username }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire('Success!', 'Username updated successfully!', 'success');
      setIsEdited(false);
    } catch (error) {
      Swal.fire('Error!', 'Failed to update username!', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('loggin');
    navigate('/');
  }
  
  return (
    <div className={styles.podcastcontainer}>
      <div className={styles.sidebar}>
        <div className={styles.upperside}>
          <div className={styles.img} onClick={() => navigate(-1)}>
              <img src={logo} alt="logo" />
          </div>
          <div className={styles.add} onClick={() => navigate(`/${productId}/addpodcast`)}>
            <AddIcon />
            <Typography variant='p'>Add your Podcast(s)</Typography>
          </div>
          <div className={styles.add1}>
            <EditIcon />
            <Typography variant='p'>Create and Repurpose</Typography>
          </div>
          <div className={styles.add1}>
            <MicIcon />
            <Typography variant='p'>Podcast Widget</Typography>
          </div>
          <div className={styles.add1}>
            <DiamondIcon />
            <Typography variant='p'>Upgrades</Typography>
          </div>
          <div className='horizontal line'><hr /></div>
        </div>
        <div className={styles.lowerside}>
          <div className={styles.add1}>
            <SettingsIcon />
            <Typography variant='p'>Help</Typography>
          </div>
          <div className='horizontal line'><hr /></div>
          <div className={styles.add1}>
            <PersonIcon />
            <Typography variant='p'>
              <div>{username}</div>
              <div>{email}</div>
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.maincontent}>
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
              <ArrowBackIcon />
            </div>
            <div className={styles.endpoint}>
              Home Page / Sample Project / <span className={styles.lefth}>Account Settings</span>
            </div>
          </div>
          <div className={styles.icons}>
            <div className={styles.icon1}><NotificationsOutlinedIcon /></div>
            <div className={styles.icon2} onClick={handleLogout}><ExitToAppIcon /></div>
          </div>
        </nav>
        <div className={styles.heading}>
          <Typography variant='h4' style={{ fontWeight: '600' }}>Account Settings</Typography>
        </div>
        <div className={styles.profile}>
          <div className={styles.profileIcon}>
            <PersonIcon sx={{ fontSize: 100 }} />
          </div>
          <div className={styles.userInfo}>
            <TextField
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              disabled
              fullWidth
              variant="outlined"
              margin="normal"
            />
            {isEdited && (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
