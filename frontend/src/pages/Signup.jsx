import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

import Wallpaper from '../assets/Rectangle 135.png'
import logo from '../assets/QuesLogo 1.png'
import logo2 from '../assets/Group 22.png'
import vector from '../assets/Isolation Mode.png'

import styles from '../styles/signup.module.css'
import { api } from '../config/api';

export default function Signup() {
const navigate = useNavigate();
const [userDetail, setUserDetail] = useState({
  username: '',
  email: '',
  password: ''
})

const handleSignup = async () => {
  try {
    const response = await axios.post(`${api.url}/signup`, {
        username: userDetail.username,
        email: userDetail.email,
        password: userDetail.password
    })
    Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: 'Your account has been created successfully!',
        confirmButtonText: 'OK'
    });
    navigate('/login')
} catch (error) {
    Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error || 'Something went wrong. Please try again.',
        confirmButtonText: 'OK'
    });
  }
}

  return (
    <div className={styles['signup-container']}>
        <div className={styles['SP-hero-section']}>
          <div className={styles['SP-hero-image']}>
            <img src={Wallpaper} alt="wallpaper" />
          </div>
          <div className={styles['SP-logo']}>
            <img src={logo} alt="logo" />
            <h6 className={styles['lato-regular']}>Your podcast<br /> will no longer<br /> be just a hobby.</h6>
            <p className={styles['lato-thin']}>Supercharge Your Distribution<br /> using our AI assistant!</p>
          </div>
          <div className={styles['SP-vector']}>
            <img src={vector} alt="desiiiccs" />
          </div>
        </div>
        <div className={styles['signup-section']}>
          <div className={styles['SP-logo2']}>
            <img src={logo2} alt="logo2" />
          </div>
          <div className={styles['SP-heading']}>
            <p>Welcome To</p>
            <h2>Ques.AI</h2>
          </div>
          <div className={styles['SP-tf-1']}>
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              value={userDetail.username}
              onChange={(e) => setUserDetail({...userDetail, username: e.target.value})}
              fullWidth
              margin='none'
              helperText="**Username should be 6 character long**"
            />
          </div>
          <div className={styles['SP-tf-2']}>
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              value={userDetail.email}
              onChange={(e) => setUserDetail({...userDetail, email: e.target.value})}
              fullWidth
            />
          </div>
          <div className={styles['SP-tf-3']}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={userDetail.password}
              onChange={(e) => setUserDetail({...userDetail, password: e.target.value})}
              fullWidth
            />
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                background: 'green',
                marginTop: '1rem'
              }}
              onClick={handleSignup}
            >Signup</Button>
            <Button
              variant="contained"
              sx={{
                background: 'red',
                marginTop: '1rem',
                marginLeft: "1rem"
              }}
              onClick={() => navigate('/login')}
            >Login</Button>
          </div>
        </div>
    </div>
  )
}
