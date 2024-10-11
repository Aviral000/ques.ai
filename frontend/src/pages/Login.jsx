import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

import Wallpaper from '../assets/Rectangle 135.png'
import logo from '../assets/QuesLogo 1.png'
import logo2 from '../assets/Group 22.png'
import vector from '../assets/Isolation Mode.png'

import styles from '../styles/signup.module.css'

export default function Login() {
const [userDetail, setUserDetail] = useState({
  email: '',
  password: ''
})

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
                background: 'black',
                marginTop: '1rem'
              }}
            >Login</Button>
          </div>
        </div>
    </div>
  )
}
