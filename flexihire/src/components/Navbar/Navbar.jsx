import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from '../../confg/firebase';
import React, { useEffect, useState } from 'react';
import "./Navbar.css"

function Navbar() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut();
  }

  const handleLinkClick = () => {
    setShow(false);
  }

  return (
    <section className='navbar-bg'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            FlexiHire
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show ? "show" : ""}`} id="navbarMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLinkClick}>
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLinkClick}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactUs" onClick={handleLinkClick}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLinkClick}>
                  About
                </Link>
              </li>
            </ul>
            {user && (
              <>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile" onClick={handleLinkClick}>
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            )}
            {!user && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in" onClick={handleLinkClick}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up" onClick={handleLinkClick}>
                    Sign up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;