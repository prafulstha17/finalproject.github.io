import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  setDoc,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import "./Member.css"; // Import any CSS styles if needed

const Member = () => {
  const [loginVisible, setLoginVisible] = useState(true);
  const [signupVisible, setSignupVisible] = useState(false);
  const [frontboxMoving, setFrontboxMoving] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      // Add user details to Firestore
      await addUserToFirestore(user.uid, name, email);
  
      // Update user profile
      await updateProfile(user, {
        displayName: name,
      });
  
      navigate("/termsCondition");
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await addUserToFirestore(user.uid, name, email);
      // You can handle the user data or navigate to a different page here
      navigate("/");
    } catch (err) {
      console.error("Google Sign-In Error:", err);
    }
  };

  // Similar functions for Facebook and Twitter sign-in
  const signInWithFacebook = async () => {
    try {
      // Implement Facebook sign-in logic
    } catch (err) {
      console.error("Facebook Sign-In Error:", err);
    }
  };

  const signInWithTwitter = async () => {
    try {
      // Implement Twitter sign-in logic
    } catch (err) {
      console.error("Twitter Sign-In Error:", err);
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

  const addUserToFirestore = async (userId, displayName, userEmail) => {
    try {
      const usersCollection = collection(db, "users");
      const userDocRef = doc(db, "users", userId);
  
      // Data to be added
      const userData = {
        userId: userId,
        displayName: displayName,
        email: userEmail,
      };
  
      // Add user data to Firestore
      await setDoc(userDocRef, userData);
  
      // Log the data to console
      console.log("User added to Firestore successfully!");
      console.log("User Data:", userData);
  
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
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
            <div className="error-login">
              {error && (
                <span className="error">
                  !! Data not found !!
                </span>
              )}
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
            <p className="or mt-4 text-center" id="color-gradient">
              Or login with
            </p>
            <ul className="social-links">
              <li>
                <a href="#" id="color-gradient" onClick={signInWithGoogle}>
                  <i className="fab fa-google"></i>
                </a>
              </li>
              <li>
                <a href="#" id="color-gradient" onClick={signInWithFacebook}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" id="color-gradient" onClick={signInWithTwitter}>
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
                autoComplete="off"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="  PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
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
                <a href="#" id="color-gradient" onClick={signInWithGoogle}>
                  <i className="fab fa-google"></i>
                </a>
              </li>
              <li>
                <a href="#" id="color-gradient" onClick={signInWithFacebook}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" id="color-gradient" onClick={signInWithTwitter}>
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="backbox">
          <div
            className={`loginMsg ${loginVisible ? "visibility" : ""} ${frontboxMoving ? "transform-left" : "transform-right"
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
            className={`signupMsg ${signupVisible ? "visibility" : ""} ${frontboxMoving ? "transform-right" : "transform-left"
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
