import React from "react";
import { auth, googleProvider } from "../../confg/firebase";
import "./SignUp.css";
import { NavLink } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  //nav path
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //create acc with email and password
  const signIn = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: name,
        });
        navigate("/termsCondition");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="sign-card" id="card">
        <div className="center-wrap">
          <div className="section text-center">
            <h4 className="mb-4 pb-3 mt-4" id="color-gradient">
              Sign Up
            </h4>
            <div className="form-group">
              <i className="input-icon uil uil-user"></i>
              <input
                type="text"
                name="logname"
                className="form-style"
                placeholder="Your Full Name"
                id="logname"
                autocomplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <i className="input-icon uil uil-at"></i>
              <input
                type="email"
                name="logemail"
                className="form-style"
                placeholder="Your Email"
                id="logemail"
                onChange={(e) => setEmail(e.target.value)}
                autocomplete="off"
                required
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
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="off"
                required
              />
            </div>
            <button href="#" className="submitButton" onClick={signIn}>
              sign up
            </button>
            <p className="or mt-4 text-center" id="color-gradient">
              Or signup with
            </p>
            <ul className="social-links">
              <li>
                <a href="#" id="color-gradient">
                  <i className="fab fa-google" onClick={signInWithGoogle}></i>
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
              <a href="#" id="color-gradient">
                <NavLink
                  to={"/sign-in"}
                  className="nav-link"
                  id="color-gradient"
                >
                  Have an account? Log in
                </NavLink>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
