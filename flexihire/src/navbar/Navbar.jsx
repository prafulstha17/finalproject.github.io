import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from '../confg/firebase';
import React,{useEffect, useState} from 'react'
import Login from '../components/Login/Login';
import SignUp from '../components/Signup/SignUp';
import Profile from '../components/Profile/Profile';
import Home from '../components/Home/Home';
import "./Navbar.css"



function Navbar() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  const[show, setShow]=useState(false);



  return <>
  <section className='navbar-bg'>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container ">
    <a className="navbar-brand" href="#">FlexiHire</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"
      onClick={()=>setShow(!show)}></span>
    </button>
    <div className={`collapse navbar-collapse ${show ? "show" : ""}`} >
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Services</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact me</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
        
      </ul>
      <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-label="Toggle navigation" 
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav ml-auto">
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={() => auth.signOut()} className="nav-link btn btn-link">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sign-in">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sign-up">
                        Sign up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
        <div className="auth-wrapper">
          {/* <div className="auth-inner container mt-5 mb-5">
            <Routes>
              <Route path="/" element={<Home name={userName} />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          </div> */}
        </div>
      </div>
            </div>
    </div>
</nav>
</section>
  </>;
}

export default Navbar;