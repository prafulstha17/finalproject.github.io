import { auth } from "../../confg/firebase";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import transparent_bg from "../Icon/low_res/transparent_bg.png";
import { Dropdown } from "react-bootstrap";

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
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  useEffect(() => {
    const menuBtn = document.querySelector(".menu-icon span");
    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    const form = document.querySelector("form");

    menuBtn.onclick = () => {
      items.classList.add("active");
      menuBtn.classList.add("hide");
      searchBtn.classList.add("hide");
      cancelBtn.classList.add("show");
    };

    cancelBtn.onclick = () => {
      items.classList.remove("active");
      menuBtn.classList.remove("hide");
      searchBtn.classList.remove("hide");
      cancelBtn.classList.remove("show");
      form.classList.remove("active");
      cancelBtn.style.color = "#ff3d00";
    };

    searchBtn.onclick = () => {
      form.classList.add("active");
      searchBtn.classList.add("hide");
      cancelBtn.classList.add("show");
    };
  }, []);

  return (
    <>
      <nav className="navbar sticky-top">
        <div class="menu-icon">
          <span class="fas fa-bars"></span>
        </div>
        <div class="logo">
          <a className="navbar-brand" href="/">
            <div className="brand-logo">
              <img src={transparent_bg} alt="brand-logo" />
            </div>
            <div className="brand-name">FlexiHire</div>
          </a>
        </div>
        <div class="nav-items">
          <li className="nav-item">
            <a className="nav-link" href="/jobs" onClick={handleLinkClick}>
              Jobs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/services" onClick={handleLinkClick}>
              Services
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contactUs" onClick={handleLinkClick}>
              Contact Us
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/aboutUs" onClick={handleLinkClick}>
              About Us
            </a>
          </li>
        </div>
        <div className="login-search">
          <div className="search-form">
            <div class="search-icon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="cancel-icon">
              <i class="fa-solid fa-xmark" style={{ color: "#ffffff" }} />
            </div>
            <form action="#">
              <button type="submit" class="fas fa-search"></button>
              <input
                type="search"
                class="search-data"
                placeholder="Search"
                required
              />
              <div class="input-select">
                <select data-trigger="" name="choices-single-default">
                  <option placeholder="">Flexer</option>
                  <option>FlexiHirer</option>
                </select>
              </div>
            </form>
          </div>
          <div class="nav-items-case">
            {user && (
              <Dropdown>
                <div className="loggedIn">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <p>User</p>
                    <i class="fa-solid fa-user fa-l"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            )}
            {!user && (
              <Dropdown>
                <div className="loggedOut">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <p>Members Area</p>
                    <i class="fa-solid fa-user fa-l"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item href="/sign-in">Login</Dropdown.Item>
                    <Dropdown.Item href="/sign-up">
                      Create Account
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
