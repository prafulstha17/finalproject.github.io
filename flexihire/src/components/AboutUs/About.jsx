import React from "react";
import "./About.css";
import { ReactComponent as TwitterIcon } from "../images/x-twitter.svg";
import LazyLoad from "react-lazyload";

function About() {
  return (
    <>
      {/* <span className="container section-1">
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
      </span> */}

      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div class="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
            <div class="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
              <div class="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                <h2 class="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                Building Stronger Freelancing and Job-Seeking Communities through Collaboration and Empowerment
                </h2>
                <p class="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                  In the freelancing and job-seeking world, collaboration is key to unlocking diverse perspectives and strengths. By creating inclusive environments where everyone—from beginners to seasoned professionals—has the opportunity to thrive, individuals can achieve personal growth and reach new career heights. This collaborative approach empowers freelancers and job seekers alike, building a stronger network that supports achievement and innovation across all levels. In doing so, we not only advance individual careers but also contribute to a more connected and resilient professional community.
                </p>
              </div>
            
            </div>
            <img
              class="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
              src="https://pagedone.io/asset/uploads/1717751272.png"
              alt="about Us image"
            />
          </div>
        </div>
      </section>

      <div class="sm:flex items-center max-w-screen-xl">
    <div class="sm:w-1/2 p-10">
        <div class="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
        </div>
    </div>
    <div class="sm:w-1/2 p-5">
        <div class="text">
            <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">About <span class="text-indigo-600">Our Company</span>
            </h2>
            <p class="text-gray-700">
            Welcome to Flexihire, your go-to platform for finding and
                    hiring talented freelancers and job seekers. Our team at
                    Flexihire consists of two passionate individuals dedicated
                    to connecting skilled freelancers and job seekers with
                    clients and companies in need of their expertise. <br />
                    <br />
                    Our platform is designed to make it easy for businesses to
                    find the right freelancer or job seeker for their projects
                    and for individuals to discover new opportunities. We've
                    integrated LinkedIn into our platform to ensure that only
                    the most qualified professionals are featured. <br />
                    <br />
                    At Flexihire, we're constantly working to improve our
                    platform and provide the best possible experience for all
                    our users. Join our community today and take advantage of
                    all the benefits Flexihire has to offer, whether you're
                    seeking to hire talent or find your next job opportunity.
            </p>
        </div>
    </div>
    
</div>



      {/* <section className="bottomDescription">
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
                    hiring talented freelancers and job seekers. Our team at
                    Flexihire consists of two passionate individuals dedicated
                    to connecting skilled freelancers and job seekers with
                    clients and companies in need of their expertise. <br />
                    <br />
                    Our platform is designed to make it easy for businesses to
                    find the right freelancer or job seeker for their projects
                    and for individuals to discover new opportunities. We've
                    integrated LinkedIn into our platform to ensure that only
                    the most qualified professionals are featured. <br />
                    <br />
                    At Flexihire, we're constantly working to improve our
                    platform and provide the best possible experience for all
                    our users. Join our community today and take advantage of
                    all the benefits Flexihire has to offer, whether you're
                    seeking to hire talent or find your next job opportunity.
                    <br />
                    <br />
                    <sup>Thank you for choosing Flexihire.</sup>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default About;
