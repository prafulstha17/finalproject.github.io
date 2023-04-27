import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './confg/firebase';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import SignUp from './components/Signup/SignUp';
import Navbar from './components/Navbar/Navbar';
import ContactForm from './components/ContactForm/ContactForm';

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
      {/* NavbarSection */}
      <Navbar/>

      <Routes>
              <Route path="/" element={<Home name={userName} />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path='/contactUs' element={<ContactForm/>}/>
              <Route path="/profile" element={<Profile user={user} />} />
      </Routes>

    </Router>
    
  );
}

export default App;
