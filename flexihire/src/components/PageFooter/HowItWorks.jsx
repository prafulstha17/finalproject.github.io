import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listenToAuthChanges } from "../../config/AuthContext";
import heroimg from "../images/how.jpg";
import side from "../images/side.jpg";
import LazyLoad from "react-lazyload";
import "./HowItWorks.css";
function Working() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user, isAdmin) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/jobs");
    } else {
      navigate("/member");
    }
  };
  return (
    <>
      <section class="banner-area relative" id="home">
        <div class="overlay overlay-bg"></div>
        <div class="container">
          <center>
            <div class="row d-flex align-items-center justify-content-center">
              <div class="about-content col-lg-12">
                <strong>
                  <h1 class="text-white">About</h1>
                  <p class="text-white link-nav">
                    <a href="#">About</a> <i class="fa-solid fa-arrow-right"> </i>
                    <a href="#"> How it works</a>
                  </p>
                </strong>
              </div>
            </div>
          </center>
        </div>
      </section>
      <div className="home">
        <white class="text-info">
          <div className="hero-content">
            <h1>How can FlexiHire help your business?</h1>
            <p>
              The possibilities are endless. We have expert flexers who work in
              every technical, professional, and creative field imaginable.
            </p>
            <button onClick={handleGetStarted}>Let's begin</button>
          </div>
        </white>
        <div className="hero-image">
          <link rel="preload" href={heroimg} as="image" />
          <LazyLoad height={200} offset={100}>
            <img src={heroimg} alt="Hero Section" loading="lazy" />
          </LazyLoad>
        </div>
        <div className="separate-by-line">
          <div className="need-something-done">
            <h2>Choose from endless possibilities</h2>
            <h3>
              Get anything done, exactly how you want it. Turn that spark of an
              idea into reality.
            </h3>
            <div className="features">
              <div className="feature">
                <h3>Any sized project</h3>
                <p>
                  Get any job done. From small one-off tasks to large, multi-stage
                  projects.
                </p>
              </div>
              <div className="feature">
                <h3>Flexible payment terms</h3>
                <p>
                  Pay your freelancers a fixed price or by the hour. All secured
                  by the Milestone Payments system.
                </p>
              </div>
              <div className="feature">
                <h3>Diverse talent</h3>
                <p>
                  Choose from expert freelancers in over 1800 skill sets, from all
                  around the globe.
                </p>
              </div>
            </div>
          </div>
          <center>
            <h2>How does it work? </h2>
            <div class="d-flex align-items-center">
              <div className="how-it-works">
                <left>
                  <div className="leftHow">
                    <link rel="preload" href={side} as="image" />
                    <LazyLoad height={10} offset={100}>
                      <img
                        src={side}
                        alt="Hero Section"
                        loading="lazy"
                        style={{ maxWidth: "35%" }}
                      />
                    </LazyLoad>
                  </div>
                </left>
                <right>
                  <div className="rightHow">
                    <div className="features">
                      <div className="feature">
                        <h3>1. Post a project or contest</h3>
                        <p>
                          Simply post a project or contest for what you need done
                          and receive competitive bids from freelancers within
                          minutes.
                        </p>
                      </div>
                      <div className="feature">
                        <h3>2. Choose the perfect freelancer</h3>
                        <p>
                          Browse freelancer profiles. Chat in real-time. Compare
                          proposals and select the best one. Award your project
                          and your freelancer starts work.
                        </p>
                      </div>
                      <div className="feature">
                        <h3>3. Pay when you’re satisfied</h3>
                        <p>
                          Pay securely using our Milestone Payment system. Release
                          payments when it has been completed and you're 100%
                          satisfied.
                        </p>
                      </div>
                    </div>
                  </div>
                </right>
              </div>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default Working;
