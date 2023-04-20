import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './confg/firebase';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import SignUp from './components/Signup/SignUp';
import './responsive.css';
import Navbar from './navbar/Navbar';

function App() {

  const user = useState(null);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onIdTokenChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  return (
    <Router>
      <Navbar/>
      <Routes>
              <Route path="/" element={<Home name={userName} />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
      
    </Router>
    
  );
}

export default App;
