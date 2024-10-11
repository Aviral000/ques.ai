import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Signup from './pages/Signup'

import './app.module.css'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import AddPodcast from './pages/AddPodcast'
import EditPodcast from './pages/EditPodcast'
import UserPage from './pages/UserPage'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/:projectId/addpodcast' element={<AddPodcast />} />
          <Route path='/:projectId/editpodcast/:episodeId' element={<EditPodcast />} />
          <Route path='/user-detail' element={<UserPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}
