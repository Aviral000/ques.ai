import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Signup from './pages/Signup'

import './app.module.css'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import AddPodcast from './pages/AddPodcast'
import EditPodcast from './pages/EditPodcast'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/addpodcast' element={<AddPodcast />} />
          <Route path='/editpodcast' element={<EditPodcast />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}
