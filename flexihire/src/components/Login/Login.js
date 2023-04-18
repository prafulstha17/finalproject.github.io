import React, { useState } from "react";
import { auth } from "../../confg/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  {
    /* error condition */
  }
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navitage = useNavigate();

  // handleLogin
  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // navitageAfterSuccesfullyLoginToNextPage
        navitage("/"); //homepage
        // ...
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="center-wrap">
      <div className="section text-center">
        <h4 className="mb-4 pb-3" id="color-gradient">
          Log In
        </h4>
        <div className="form-group">
          <input
            type="email"
            name="logemail"
            className="form-style"
            placeholder="Your Email"
            id="logemail"
            autocomplete="off"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="input-icon uil uil-at"></i>
        </div>
        <div className="form-group mt-2">
          <input
            type="password"
            name="logpass"
            className="form-style"
            placeholder="Your Password"
            id="logpass"
            autocomplete="off"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="input-icon uil uil-lock-alt"></i>
        </div>
        <div className="side mb-0 pb-3">
          <span>
            <div className="form-check">
             
            </div>
          </span>
          <span>
            <p>
              <a href="#0" className="link" id="color-gradient">
                Forgot your password?
              </a>
            </p>
          </span>
        </div>
        <button
          className="btn btn-info btn-lg btn-block btn-outline-danger "
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <span style={{color:"red"}}>Wrong email or password</span>}

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
          <a href="#" className="join" onclick="create()" id="color-gradient">
            Not a member? Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
