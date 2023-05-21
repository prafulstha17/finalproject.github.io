import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./confg/firebase";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import ContactForm from "./components/ContactForm/ContactForm";
import AboutUs from "./components/AboutUs/AboutUs";
import PageFooter from "./components/PageFooter/PageFooter";
import Jobs from "./components/Jobs/Jobs";
import WhyUs from "./components/AboutUs/WhyUs";
import TermsCondition from "./components/AboutUs/TermsCondition";
import Message from "./components/Message/Message";
import Services from "./components/Services/Services";
import Admin from "./components/AdminPanel/Admin";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Loading from "./components/Loading/Loading";
import "./App.css";

const AdminContext = React.createContext(false);

function App() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setUser(user);
        setIsAdmin(user.email === "flexihirenepal@gmail.com");
      } else {
        setUserName("");
        setUser(null);
        setIsAdmin(false);
      }

      setTimeout(() => {
        setLoading(false);
      }, 250); // Delay of seconds

    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a loading indicator or skeleton screen while checking authentication state
    return <Loading />;
  }

  return (
    <AdminContext.Provider value={isAdmin}>
      <Router>
        {isAdmin ? (
          <Admin />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home name={userName} />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contactUs" element={<ContactForm />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/whyUs" element={<WhyUs />} />
              <Route path="/termsCondition" element={<TermsCondition />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
            <PageFooter />
            <Message />
          </>
        )}
      </Router>
    </AdminContext.Provider>
  );
}

export default App;
