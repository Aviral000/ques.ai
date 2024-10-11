import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { FaPodcast } from "react-icons/fa";
import { RiVipDiamondLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdExit } from "react-icons/io";

import styles from '../styles/addpodcast.module.css';
import logo from '../assets/QuesLogo 1 (1).png';
import image1 from '../assets/image 1.png'
import image2 from '../assets/image 2.png'
import image3 from '../assets/ic_round-upload.png'
import vector from '../assets/Vector.png'
import CreateYoutube from '../components/CreateYoutube';

import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { api } from '../config/api';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddPodcast() {
  const token = localStorage.getItem('token');
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('Username');
  const [email, setEmail] = useState('Email');
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const { projectId } = useParams();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      const response = await axios.get(`${api.url2}/${projectId}/episodes`, {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggin');
    navigate('/');
  }

  const handleDeleteEpisode = async (episodeId) => {
    console.log(episodeId);
    try {
      const response = await axios.delete(`${api.url2}/${projectId}/episodes/${episodeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Deletion',
        text: 'You have successfully deleted a episode',
        confirmButtonText: 'OK'
      });
      fetchEpisodes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Deletion',
        text: 'Server not responding',
        confirmButtonText: 'OK'
      });
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };
  
  return (
    <div className={styles.podcastcontainer}>
      <div className={styles.sidebar}>
        <div className={styles.upperside}>
          <div className={styles.img} onClick={() => navigate('/')}>
              <img src={logo} alt="logo" />
          </div>
          <div className={styles.add}>
            <FaPlus />
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
          <div className={styles.add1} onClick={() => navigate('/user-detail')}>
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
          <Typography variant='h4' style={{ fontWeight: '600' }}>Add Podcast</Typography>
        </div>
        <div className={styles.cards}>
          <div className={styles.card1}>
            <div className={styles.subcard1}>
            <Typography variant='h6' style={{ fontWeight: '600' }}>RSS Feed</Typography>
              <div>Lorem ipsum dolor sit. Dolor lorem sit.</div>
            </div>
            <div>
              <img src={image1} alt="rcc-feed" />
            </div>
          </div>
          <div className={styles.card1} onClick={handleOpenModal}>
            <div className={styles.subcard1}>
            <Typography variant='h6' style={{ fontWeight: '600' }}>Youtube Videos</Typography>
              <div>Lorem ipsum dolor sit. Dolor lorem sit.</div>
            </div>
            <div>
              <img src={image2} alt="youtube" />
            </div>
          </div>
          <div className={styles.card1}>
            <div className={styles.subcard1}>
            <Typography variant='h6' style={{ fontWeight: '600' }}>Upload Files</Typography>
              <div>Lorem ipsum dolor sit. Dolor lorem sit.</div>
            </div>
            <div>
              <img src={image3} alt="files" />
            </div>
          </div>
        </div>

        <div className={ episodes.length === 0 ? styles.upload:styles.table}>
          { episodes.length === 0 ? (
          <>
            <div>
              <img src={vector} alt="" />
            </div>
            <p className={styles.line1}>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
            <p className={styles.line2}>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </p>
            <Button variant="outlined" sx={{ borderRadius: '1rem' }}>Select File</Button>
          </>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.episodeTable}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Upload Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {episodes.map((episode, index) => (
                    <tr key={episode._id}>
                      <td>{index + 1}</td>
                      <td>{episode.title}</td>
                      <td>{formatDate(episode.createdAt)}</td>
                      <td>
                        <Button
                          variant="outlined"
                          style={{ marginRight: '10px' }}
                          onClick={() => navigate(`/${projectId}/editpodcast/${episode._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteEpisode(episode._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <CreateYoutube open={openModal} handleClose={handleCloseModal} fetchEpisodes={fetchEpisodes}/>
    </div>
  )
}
