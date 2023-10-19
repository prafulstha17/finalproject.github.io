import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import "./Member.css"; // Import any CSS styles if needed

const Member = () => {
  const [loginVisible, setLoginVisible] = useState(true);
  const [signupVisible, setSignupVisible] = useState(false);
  const [frontboxMoving, setFrontboxMoving] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const isAdmin = email === "flexihirenepal@gmail.com";
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  const handleForgotPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your email.");
      })
      .catch((error) => {
        console.error("Error sending password reset email: ", error.message);
      });
  };

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

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSwitch1 = () => {
    setLoginVisible(true);
    setSignupVisible(false);
    setFrontboxMoving(false);
    console.log("Box is not moving.");
  };

  const handleSwitch2 = () => {
    setLoginVisible(false);
    setSignupVisible(true);
    setFrontboxMoving(true);
    console.log("Box is moving.");
  };

  return (
    <div className="memberBody">
      <div className="containerMember">
        <div className={`frontbox ${frontboxMoving ? "moving" : ""}`}>
          <div className={`login ${loginVisible ? "" : "hide"}`}>
            <h2>LOG IN</h2>
            <div className="inputbox">
              <input
                type="text"
                name="email"
                placeholder="  EMAIL"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="  PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a
              href="#0"
              className="link-forget text-center"
              id="color-gradient"
              onClick={handleForgotPassword}
            >
              FORGET PASSWORD?
            </a>
            <button
              className={`login-button ${loginVisible ? "" : "hide"}`}
              type="submit"
              onClick={handleLogin}
            >
              LOG IN
            </button>
            <div className="error-login">
              {error && (
                <span className="error">
                  <br />
                  Do I know you??
                </span>
              )}
            </div>
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
          </div>

          <div className={`signup ${signupVisible ? "" : "hide"}`}>
            <h2>SIGN UP</h2>
            <div className="inputbox">
              <input
                type="text"
                name="fullname"
                placeholder="  FULLNAME"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                name="email"
                placeholder="  EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                autocomplete="off"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="  PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="off"
                required
              />
            </div>
            <button
              className={`signup-button ${signupVisible ? "" : "hide"}`}
              onClick={signIn}
            >
              SIGN UP
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
          </div>
        </div>

        <div className="backbox">
          <div
            className={`loginMsg ${loginVisible ? "visibility" : ""} ${
              frontboxMoving ? "transform-left" : "transform-right"
            }`}
          >
            <div className="textcontent">
              <p className="title">Already have an account?</p>
              <p>Log in to see all your collection.</p>
              <button className="backLog" onClick={handleSwitch1}>
                LOG IN
              </button>
            </div>
          </div>
          <div
            className={`signupMsg ${signupVisible ? "visibility" : ""} ${
              frontboxMoving ? "transform-right" : "transform-left"
            }`}
          >
            <div className="textcontent">
              <p className="title">Don't have an account?</p>
              <p>Sign up to save all your graph.</p>
              <button className="backSign" onClick={handleSwitch2}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
