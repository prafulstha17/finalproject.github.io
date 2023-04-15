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
    <div class="card-back" id="card">
                <div class="center-wrap">
                  <div class="section text-center">
                    <h4 class="mb-4 pb-3" id="color-gradient">Sign Up</h4>
                    <div class="form-group">
                      <input type="text" name="logname" class="form-style"
                        placeholder="Your Full Name" id="logname" autocomplete="off"/>
                      <i class="input-icon uil uil-user"></i>
                    </div>
                    <div class="form-group mt-2">
                      <input type="email" name="logemail" class="form-style"
                        placeholder="Your Email" id="logemail" onChange={(e) => setEmail(e.target.value)}
                        autocomplete="off" required/>
                      <i class="input-icon uil uil-at"></i>
                    </div>
                    <div class="form-group mt-2">
                      <input type="password" name="logpass" class="form-style"
                        placeholder="Your Password" id="logpass" onChange={(e) => setPassword(e.target.value)}
                        autocomplete="off" required/>
                      <i class="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button href="#"
                      class="btn btn-info btn-lg btn-block btn-outline-danger mt-4" onClick={signIn}>sign
                      up</button>
                    <p class="or mt-4 text-center" id="color-gradient">Or signup with</p>
                    <ul class="social-links">
                      <li><a href="#" id="color-gradient"><i
                            class="fab fa-google"></i></a>
                      </li>
                      <li><a href="#" id="color-gradient"><i
                            class="fab fa-facebook-f"></i></a></li>
                      <li><a href="#" id="color-gradient"><i
                            class="fab fa-twitter"></i></a>
                      </li>
                    </ul>
                    <p class="mb-0 mt-4 text-center"><a href="#" class="login"
                        onclick="enter()" id="color-gradient">Have an account?
                        Log in</a></p>
                  </div>
                  <div>
                  
                  <button type='submit' onClick={signInWithGoogle}> Sign In With Google</button>
                  </div>
                </div>
              </div>
  )
}

export default SignUp