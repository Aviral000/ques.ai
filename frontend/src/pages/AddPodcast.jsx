import React, { useState } from 'react'
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

export default function AddPodcast() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  return (
    <div className={styles.podcastcontainer}>
      <div className={styles.sidebar}>
        <div className={styles.upperside}>
          <div className={styles.img}>
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
          <div className={styles.add1}>
            <CiUser />
            <Typography variant='p'>Username</Typography>
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
            <div className={styles.icon2}><IoMdExit /></div>
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
        <div className={styles.upload}>
          <div>
            <img src={vector} alt="" />
          </div>
          <p className={styles.line1}>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
          <p className={styles.line2}>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </p>
          <Button variant="outlined" sx={{ borderRadius: '1rem' }}>Select File</Button>
        </div>
      </div>
      <CreateYoutube open={openModal} handleClose={handleCloseModal}/>
    </div>
  )
}
