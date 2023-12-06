// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import ContactForm from './components/ContactForm/ContactForm';
import AboutUs from './components/AboutUs/About';
import Jobs from './components/Jobs/Jobs';
import WhyUs from './components/AboutUs/WhyUs';
import TermsCondition from './components/AboutUs/TermsCondition';
import Profile from './components/Profile/Profile';
import Member from './components/Login/Member';
import HowItWorks from './components/PageFooter/HowItWorks';
import PageNotFound from './components/PageNotFound/PageNotFound';
import MailReceived from './components/ContactForm/MailReceived';
import OthersProfile from './components/Profile/OthersProfile';

const AppRoutes = ({ userName }) => {
  return (
    <Routes>
      <Route path="/" element={<Home name={userName} />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contactUs" element={<ContactForm />} />
      <Route path="/mailReceived" element={<MailReceived />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/whyUs" element={<WhyUs />} />
      <Route path="/termsCondition" element={<TermsCondition />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/member" element={<Member />} />
      <Route path="/howItWorks" element={<HowItWorks />} />

      <Route path="/users/:userId" element={<OthersProfile />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
