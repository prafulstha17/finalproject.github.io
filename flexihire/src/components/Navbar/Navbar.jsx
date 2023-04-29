import { auth } from '../../confg/firebase';
import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import transparent_bg from '../Icon/low_res/transparent_bg.png';

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
          <a className="navbar-brand" href="/">
            <div className="brand-logo">
              <img src={transparent_bg} alt='brand-logo' />
            </div>
            <div className="brand-name">
              FlexiHire
            </div>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show ? "show" : ""}`} id="navbarMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleLinkClick}>
                  Jobs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleLinkClick}>
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contactUs" onClick={handleLinkClick}>
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/aboutUS" onClick={handleLinkClick}>
                  About
                </a>
              </li>
            </ul>
            {user && (
              <>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/profile" onClick={handleLinkClick}>
                      Profile
                    </a>
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
                  <a className="nav-link" href="/sign-in" onClick={handleLinkClick}>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/sign-up" onClick={handleLinkClick}>
                    Sign up
                  </a>
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
