import React from "react";
import "./About.css";
import { ReactComponent as TwitterIcon } from "../images/x-twitter.svg";
import LazyLoad from "react-lazyload";

function About() {
  return (
    <>
      <span className="container section-1">
        <div class="full-width-background"></div>
        <div className="slogan">
          <h1 className="company-title">FLEXIHIRE</h1>
          <h2 className="company-slogan">
            Providing the best you always wanted.
          </h2>
        </div>
        <div className="home-computer-container">
          <link
            rel="preload"
            href="https://github.com/r-e-d-ant/Computer-store-website/blob/main/assets/images/home_img.png?raw=true"
            as="image"
          />
          <LazyLoad height={200} offset={100}>
            <img
              className="home-computer"
              src="https://github.com/r-e-d-ant/Computer-store-website/blob/main/assets/images/home_img.png?raw=true"
              alt="a computer in dark with shadow"
              loading="lazy"
            />
          </LazyLoad>
        </div>
      </span>

      <section className="bottomDescription">
        <div className="aboutDescription">
          <div className="row">
            <div className="sideAbout">
              <div className="containers col-lg-6 col-md-6">
                <div className="pic"></div>
                <div className="box1"></div>
                <div className="box2"></div>
                <div className="box3"></div>
                <div className="social1">
                  <a
                    href="https://www.facebook.com/profile.php?id=100092199707911"
                    class="social-icon"
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </div>
                <div className="social2">
                  <a
                    href="https://www.instagram.com/hireflexi/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="social3">
                  <a
                    href="https://twitter.com/HireFlexi"
                    class="social-icon"
                    target="_blank"
                  >
                    <TwitterIcon className="twitter-icon" />
                  </a>
                </div>
              </div>
            </div>
            <div className="sideAbout">
              <div className="content col-md-offset-6 col-lg-offset-6">
                <h1 className="contentHead">ABOUT</h1>
                <div className="shortDesc">
                  <h2 class="text-blk subHeading">
                    Welcome to Flexihire, your go-to platform for finding and
                    hiring talented freelancers. Our team at Flexihire consists
                    of two passionate individuals dedicated to connecting
                    skilled freelancers with clients who need their expertise.
                    <br />
                    <br />
                    Our platform is designed to make it easy for businesses to
                    find the right freelancer for their project, and for
                    freelancers to find new opportunities. We've integrated
                    LinkedIn into our platform to ensure that only the most
                    qualified professionals are on our site.
                    <br />
                    <br />
                    At Flexihire, we're constantly working to improve our
                    platform and provide the best possible experience for our
                    users. Join our community today and take advantage of all
                    the benefits Flexihire has to offer.
                    <br />
                    <br />
                    <sup>Thank you for choosing Flexihire.</sup>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
