import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {

  return (
    <GoogleOAuthProvider clientId="66618411565-2j4jhti4j7skhnql19rsvbs2fk9uvhkc.apps.googleusercontent.com">

      <Router>

        <Container maxWidth='lg'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />

          </Routes>
        </Container>
      </Router>

    </GoogleOAuthProvider>


  )
}

export default App