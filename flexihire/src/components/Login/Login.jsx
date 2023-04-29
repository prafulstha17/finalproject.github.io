import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink, Routes, Route } from "react-router-dom";
import "./Login.css";

import SignUp from "../Signup/SignUp";

function Login() {
  /* error condition */
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handleLogin
  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // navigateAfterSuccessfullyLoginToNextPage
        navigate("/"); //homepage
        // ...
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login-card" id="card">
      <div className="center-wrap">
        <div className="section text-center">
          <h4 className="mb-4 pb-3" id="color-gradient">
            Log In
          </h4>
          <div className="form-group">
            <i className="input-icon uil uil-at"></i>
            <input
              type="email"
              name="logemail"
              className="form-style"
              placeholder="Your Email"
              id="logemail"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <i className="input-icon uil uil-lock-alt"></i>
            <input
              type="password"
              name="logpass"
              className="form-style"
              placeholder="Your Password"
              id="logpass"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mb-0 mt-4 pb-3 text-center">
            <a href="#0" className="link-forget text-center" id="color-gradient">
              Forgot your password?
            </a>
          </p>
        </div>
        <button
          className="submitButton "
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <span className="error"><br/>Do I know you??</span>}

        <p className="or mt-4 text-center" id="color-gradient">
          Or login with
        </p>
        <ul className="social-links">
          <li>
            <a href="#" id="color-gradient">
              <i className="fab fa-google"></i>
            </a>
          </li>
          <li>
            <a href="#" id="color-gradient">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#" id="color-gradient">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
        </ul>
        <p className="mb-0 mt-4 text-center">
          <NavLink to={"/sign-up"} className="nav-link" id="color-gradient">
            Not a member? Sign up
          </NavLink>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </p>
      </div>
    </div>
  );
}

export default Login;
