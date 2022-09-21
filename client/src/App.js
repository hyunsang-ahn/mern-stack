import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetail from './components/PostDetail/PostDetail';

import { GoogleOAuthProvider } from '@react-oauth/google';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <GoogleOAuthProvider clientId="66618411565-2j4jhti4j7skhnql19rsvbs2fk9uvhkc.apps.googleusercontent.com">

      <Router>

        <Container maxWidth='xl'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />

            <Route path="/auth" element={(!user ? <Auth /> : <Navigate to="/posts" />)} />

          </Routes>
        </Container>
      </Router>

    </GoogleOAuthProvider>


  )
}

export default App