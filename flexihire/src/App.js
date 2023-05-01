import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './confg/firebase';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import SignUp from './components/Signup/SignUp';
import Navbar from './components/Navbar/Navbar';
import ContactForm from './components/ContactForm/ContactForm';
import AboutUs from './components/AboutUs/AboutUs';
import PageFooter from './components/PageFooter/PageFooter';
import Jobs from './components/Jobs/Jobs';
import Admin from './components/Admin/Admin';
import WhyUs from './components/AboutUs/WhyUs';
import TermsCondition from './components/AboutUs/TermsCondition';
import Message from './components/Message/Message';
import Services from './components/Services/Services';

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home name={userName} />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/services" element={<Services />} />
        <Route path='/contactUs' element={<ContactForm />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/whyUs' element={<WhyUs/>} />
        <Route path='/termsCondition' element={<TermsCondition/>} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
      <PageFooter />
      <Message/>
    </Router>
  );
}

export default App;
