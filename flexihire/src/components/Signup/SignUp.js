import React from 'react'
import { auth, googleProvider } from "../../confg/firebase";

import {
    createUserWithEmailAndPassword,
    signInWithPopup
  } from "firebase/auth";

  import { useState } from "react";

function SignUp() {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };




  return (
    <div className="card-back" id="card">
                <div className="center-wrap">
                  <div className="section text-center">
                    <h4 className="mb-4 pb-3" id="color-gradient">Sign Up</h4>
                    <div className="form-group">
                      <input type="text" name="logname" className="form-style"
                        placeholder="Your Full Name" id="logname" autocomplete="off"/>
                      <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="email" name="logemail" className="form-style"
                        placeholder="Your Email" id="logemail" onChange={(e) => setEmail(e.target.value)}
                        autocomplete="off" required/>
                      <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="password" name="logpass" className="form-style"
                        placeholder="Your Password" id="logpass" onChange={(e) => setPassword(e.target.value)}
                        autocomplete="off" required/>
                      <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button href="#"
                      className="btn btn-info btn-lg btn-block btn-outline-danger mt-4" onClick={signIn}>sign
                      up</button>
                    <p className="or mt-4 text-center" id="color-gradient">Or signup with</p>
                    <ul className="social-links">
                      <li><a href="#" id="color-gradient"><i
                            className="fab fa-google" onClick={signInWithGoogle}></i></a>
                      </li>
                      <li><a href="#" id="color-gradient"><i
                            className="fab fa-facebook-f"></i></a></li>
                      <li><a href="#" id="color-gradient"><i
                            className="fab fa-twitter"></i></a>
                      </li>
                    </ul>
                    <p className="mb-0 mt-4 text-center"><a href="#" className="login"
                        onclick="enter()" id="color-gradient">Have an account?
                        Log in</a></p>
                  </div>
                  
                </div>
              </div>
  )
}

export default SignUp