import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listenToAuthChanges } from '../JobInfo/AuthContext';
import heroimg from "../image/heroimg.jpg";
import LazyLoad from "react-lazyload";
import "./Home.css";

function Home(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user, isAdmin) => {
      setIsLoggedIn(!!user); // Update the state based on the user's existence
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/jobs");
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <div className="home">
      <div className="hero-content">
        <h1>Make your own change</h1>
        <p>Forget the old rules. Choose what's perfect for you.</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
      <div className="hero-image">
        <link rel="preload" href={heroimg} as="image" />
        <LazyLoad height={200} offset={100}>
          <img src={heroimg} alt="Hero Section" loading="lazy" />
        </LazyLoad>
      </div>
      <div className="separate-by-line">
        <div className="need-something-done">
          <h2>Need something done? </h2>
          <div className="features">
            <div className="feature">
              <h3>Post a job</h3>
              <p>
                It’s free and easy to post a job. Simply fill in a title,
                description and budget and competitive bids come within minutes.
              </p>
            </div>
            <div className="feature">
              <h3>Choose freelancers</h3>
              <p>
                No job is too big or too small. We've got freelancers for jobs
                of any size or budget, across 1800+ skills. No job is too
                complex. We can get it done!
              </p>
            </div>
            <div className="feature">
              <h3>Pay safely</h3>
              <p>
                Only pay for work when it has been completed and you're 100%
                satisfied with the quality using our milestone payment system.
              </p>
            </div>
            <div className="feature">
              <h3>We’re here to help</h3>
              <p>
                Our talented team of recruiters can help you find the best
                freelancer for the job and our technical co-pilots can even
                manage the project for you.
              </p>
            </div>
          </div>
        </div>

        <div className="whats-great">
          <h2>What's great about it? </h2>
          <div className="features">
            <div className="feature">
              <h3>Fast bids</h3>
              <p>
                Receive obligation-free quotes from our talented freelancers
                fast. 80% of projects get bid on within 60 seconds.
              </p>
            </div>
            <div className="feature">
              <h3>Quality work</h3>
              <p>
                FlexiHire has by far the largest pool of quality freelancers
                globally to choose from.
              </p>
            </div>
            <div className="feature">
              <h3>Track progress</h3>
              <p>Keep up-to-date and on-the-go with what flexers are up to.</p>
            </div>
          </div>
        </div>

        <div className="make-it-real">
          <h1>Make it Real with Flexer.</h1>
          <h5>Get some inspiration from 1800+ skills</h5>
          {/* Gallery */}
          <div className="gallery">{/* Add images here */}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
