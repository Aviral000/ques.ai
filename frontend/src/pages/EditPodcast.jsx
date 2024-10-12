import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { GoPencil } from "react-icons/go";
import { FaPodcast } from "react-icons/fa";
import { RiVipDiamondLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdExit } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

import styles from '../styles/editpodcast.module.css';
import logo from '../assets/QuesLogo 1 (1).png';
import Swal from 'sweetalert2';

import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../config/api';
import axios from 'axios';
import { productContext } from '../contextAPI/productProvider';

export default function AddPodcast() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [description, setDescription] = useState('');
    const [edit, setEdit] = useState(false);
    const { projectId, episodeId } = useParams();
    const [username, setUsername] = useState('Username');
    const [email, setEmail] = useState('Email');
    const { setProductId } = useContext(productContext);

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancel = () => {
        setEdit(false);
    }

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

    const handleSave = async () => {
      try {
        const response = await axios.put(`${api.url2}/${projectId}/episodes/${episodeId}`, {
          description: description
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Updation',
          text: 'You have successfully updated the Description',
          confirmButtonText: 'OK'
        });
        setEdit(false);
      } catch(error) {
        console.log(error);
      }
    }

    const fetchEpisode = async () => {
      try {
        const response = await axios.get(`${api.url2}/${projectId}/episodes/${episodeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data);
        setDescription(response.data.episode.description);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      fetchEpisode();
      fetchUser();
    }, [])

    const handleUser = () => {
      setProductId(projectId);
      navigate('/user-detail')
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      sessionStorage.removeItem('loggin');
      navigate('/');
    }
  
  return (
    <div className={styles.podcastcontainer}>
      <div className={styles.sidebar}>
        <div className={styles.upperside}>
          <div className={styles.img} onClick={() => navigate('/')}>
              <img src={logo} alt="logo" />
          </div>
          <div className={styles.add} onClick={() => navigate(`/${projectId}/addpodcast`)}>
            <AddIcon />
            <Typography variant='p'>Add your Podcast(s)</Typography>
          </div>
          <div className={styles.add1}>
            <GoPencil />
            <Typography variant='p'>Create and Repurpose</Typography>
          </div>
          <div className={styles.add1}>
            <FaPodcast />
            <Typography variant='p'>Podcast Widget</Typography>
          </div>
          <div className={styles.add1}>
            <RiVipDiamondLine />
            <Typography variant='p'>Upgrades</Typography>
          </div>
          <div className='horizontal line'><hr /></div>
        </div>
        <div className={styles.lowerside}>
          <div className={styles.add1}>
            <CiSettings />
            <Typography variant='p'>Help</Typography>
          </div>
          <div className='horizontal line'><hr /></div>
          <div className={styles.add1} onClick={handleUser}>
            <CiUser />
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
            <div>
              <GoHome />
            </div>
            <div className={styles.endpoint}>Home Page / Sample Project / <span className={styles.lefth}>Add your Podcast</span></div>
          </div>
          <div className={styles.icons}>
            <div className={styles.icon1}><IoIosNotificationsOutline /></div>
            <div className={styles.icon2} onClick={handleLogout}><IoMdExit /></div>
          </div>
        </nav>
        <div className={styles.heading}>
            <div>
                <Link to={`/${projectId}/addpodcast`}>
                    <IoArrowBack />
                </Link>
                <Typography variant='h4' style={{ fontWeight: '600' }}>Edit Transcript</Typography>
            </div>
            <div>
                {!edit ? (<Button color="warning" variant="outlined" onClick={() => navigate(`/${projectId}/addpodcast`)}>
                    Go Back
                </Button>) : (
                <Button color="warning" variant="outlined" onClick={handleCancel}>
                    Cancel
                </Button>
                )}
                {!edit ? (<Button color="primary" variant="contained" onClick={handleEdit}>
                    Edit
                </Button>) : (
                <Button color="primary" variant="contained" onClick={handleSave}>
                    Save
                </Button>
                )}
            </div>
        </div>
        <div className={styles.description}>
            <TextField
                fullWidth
                multiline
                rows={20}
                variant="outlined"
                placeholder="Type here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="dense"
                sx={{
                    backgroundColor: 'white'
                }}
                disabled={!edit}
            />
        </div>
      </div>
    </div>
  )
}
