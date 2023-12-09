import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import transparent_bg from "../Icon/low_res/transparent_bg.png";
import { Dropdown } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import OthersProfile from "../Profile/OthersProfile";

function Navbar() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("Flexer"); // Added state for selected dropdown

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      let collectionName = "posts";
      let fieldName = "title";

      if (selectedDropdown === "Flexer") {
        collectionName = "users";
        fieldName = "displayName";
      }

      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const results = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Check if the field we want to search is defined before using toLowerCase()
        if (data && data[fieldName] && typeof data[fieldName] === 'string') {
          if (data[fieldName].toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(data);
          }
        }
      });

      setSearchResults(results);
    };


    fetchData();
  }, [searchTerm, selectedDropdown]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
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

  const handleSearchItemClick = (item) => {
    setSearchTerm("");
    setSearchResults([]);

    const userId = item.userId;
    console.log("Selected userId:", userId);

    if (userId === user?.uid) {
      navigate("/profile");
    } else {
      if (selectedDropdown === "Flexer") {
        navigate(`/users/${userId}`);
      } else {
        navigate(`/jobs`);
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Fetch data for autocomplete suggestions
    const fetchAutocompleteData = async () => {
      if (value.trim() === "") {
        setSearchResults([]);
        return;
      }

      let collectionName = "posts";
      let fieldName = "title";

      if (selectedDropdown === "Flexer") {
        collectionName = "users";
        fieldName = "displayName";
      }

      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const results = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && typeof data[fieldName] === 'string' &&
          data[fieldName].toLowerCase().includes(value.toLowerCase())) {
          results.push(data[fieldName]);
        }
      });

      setSearchResults(results);
    };

    fetchAutocompleteData();
  };

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
              <Dropdown>
                <input
                  type="search"
                  className="search-data"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required
                />
                <div className="dataSearch">
                  <ul>
                    {searchResults.map((item) => (
                      <li key={item.id}>
                        <a
                          href="#"
                          onClick={() => handleSearchItemClick(item)} // Handle item click
                        >
                          {selectedDropdown === "Flexer" ? item.displayName : item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Dropdown>
              <div class="input-select">
                <select
                  data-trigger=""
                  name="choices-single-default"
                  value={selectedDropdown}
                  onChange={(e) => setSelectedDropdown(e.target.value)}
                >
                  <option value="Flexer">Flexer</option>
                  <option value="Openings">All Openings</option>
                </select>
              </div>
            </form>
          </div>
          <div class="nav-items-case">
            {user && (
              <Dropdown>
                <div className="loggedIn">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <i class="fa-solid fa-user"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            )}
            {!user && (
              <div className="memberArea">
                <a href="/member">Members Area</a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
