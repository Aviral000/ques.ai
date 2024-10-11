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
import { IoArrowBack } from "react-icons/io5";

import styles from '../styles/editpodcast.module.css';
import logo from '../assets/QuesLogo 1 (1).png';
import vector from '../assets/Vector.png'

import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AddPodcast() {
    const [description, setDescription] = useState('');
    const [transcript, setTranscript] = useState(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      );
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancel = () => {
        setEdit(false);
    }

    const handleSave = () => {
        setEdit(false);
    }
  
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
            <div>
                <Link to='/addpodcast'>
                    <IoArrowBack />
                </Link>
                <Typography variant='h4' style={{ fontWeight: '600' }}>Edit Transcript</Typography>
            </div>
            <div>
                <Button color="error" onClick={handleCancel}>
                    Cancel
                </Button>
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
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
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
