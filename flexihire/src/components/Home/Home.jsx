import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { listenToAuthChanges } from "../../config/AuthContext";
import ProductCategories from "./Pictures";
import heroimg from "../images/heroimg.jpg";
import LazyLoad from "react-lazyload";
import "./Home.css";

function Home(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const handleButtonClick = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    button.style.setProperty("--click-x", `${offsetX}px`);
    button.style.setProperty("--click-y", `${offsetY}px`);
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 1000);
  };

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
    
    <div className="home">
         <div class="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5" data-aos="fade-right" data-aos-duration="800">
          <div class="pr-2 md:mb-14 py-14 md:py-0">
            
      
          </div>
  
          <div class="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
            <img id="heroImg1" class="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0" src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png" alt="Awesome hero page image" width="500" height="488"/>
          </div>
        </div>
      <div className="hero-content">
        <section className="nav">
          <h1>Elevate the search for your next career
          </h1>
          <h3 className="span loader">
            <span className="m">C</span>
            <span className="m">H</span>
            <span className="m">O</span>
            <span className="m">O</span>
            <span className="m">S</span>
            <span className="m">E</span>
            <span className="m">&nbsp;</span>
            <span className="m">W</span>
            <span className="m">H</span>
            <span className="m">A</span>
            <span className="m">T</span>
            <span className="m">'</span>
            <span className="m">S</span>
            <span className="m">&nbsp;</span>
            <span className="m">P</span>
            <span className="m">E</span>
            <span className="m">R</span>
            <span className="m">F</span>
            <span className="m">E</span>
            <span className="m">C</span>
            <span className="m">T</span>
            <span className="m">&nbsp;</span>
            <span className="m">F</span>
            <span className="m">O</span>
            <span className="m">R</span>
            <span className="m">&nbsp;</span>
            <span className="m">Y</span>
            <span className="m">O</span>
            <span className="m">U</span>
          </h3>
        </section>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
      {/* <div className="hero-image">
        <link rel="preload" href={heroimg} as="image" />
        <LazyLoad height={200} offset={100}>
          <img src={heroimg} alt="Hero Section" loading="lazy" />
        </LazyLoad>
      </div> */}

      

      
      <div className="separate-by-line">
        
        <div className="need-something-done">
          <h2 className="text-black">Need something done? </h2>

          <div class="grid gap-14 md:grid-cols-3 md:gap-5">
    <div class="rounded-xl bg-white p-6 text-center shadow-xl">
      <div
        class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
      </div>
      <h1 class="text-darken mb-3 text-xl font-medium lg:px-14 text-black">Post a job</h1>
      <p class="px-4 text-gray-500">It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
    </div>
    <div data-aos-delay="150" class="rounded-xl bg-white p-6 text-center shadow-xl">
      <div
        class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
          <svg viewBox=" 0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white">
        </svg>
      </div>
      <h1 class="text-darken mb-3 text-xl font-medium lg:px-14 text-black">Pay safely</h1>
      <p class="px-4 text-gray-500">Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.</p>
    </div>
    <div data-aos-delay="300" class="rounded-xl bg-white p-6 text-center shadow-xl">
      <div
        class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
        <svg viewBox="0 0 55 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white">
          <path
            d="M8.25 19.25C11.2836 19.25 13.75 16.7836 13.75 13.75C13.75 10.7164 11.2836 8.25 8.25 8.25C5.21641 8.25 2.75 10.7164 2.75 13.75C2.75 16.7836 5.21641 19.25 8.25 19.25ZM46.75 19.25C49.7836 19.25 52.25 16.7836 52.25 13.75C52.25 10.7164 49.7836 8.25 46.75 8.25C43.7164 8.25 41.25 10.7164 41.25 13.75C41.25 16.7836 43.7164 19.25 46.75 19.25ZM49.5 22H44C42.4875 22 41.1211 22.6102 40.1242 23.5984C43.5875 25.4977 46.0453 28.9266 46.5781 33H52.25C53.7711 33 55 31.7711 55 30.25V27.5C55 24.4664 52.5336 22 49.5 22ZM27.5 22C32.8195 22 37.125 17.6945 37.125 12.375C37.125 7.05547 32.8195 2.75 27.5 2.75C22.1805 2.75 17.875 7.05547 17.875 12.375C17.875 17.6945 22.1805 22 27.5 22ZM34.1 24.75H33.3867C31.5992 25.6094 29.6141 26.125 27.5 26.125C25.3859 26.125 23.4094 25.6094 21.6133 24.75H20.9C15.4344 24.75 11 29.1844 11 34.65V37.125C11 39.4023 12.8477 41.25 15.125 41.25H39.875C42.1523 41.25 44 39.4023 44 37.125V34.65C44 29.1844 39.5656 24.75 34.1 24.75ZM14.8758 23.5984C13.8789 22.6102 12.5125 22 11 22H5.5C2.46641 22 0 24.4664 0 27.5V30.25C0 31.7711 1.22891 33 2.75 33H8.41328C8.95469 28.9266 11.4125 25.4977 14.8758 23.5984Z"
            fill="white"></path>
        </svg>
      </div>
      <h1 class="text-darken mb-3 pt-3 text-xl font-medium lg:h-14 lg:px-14 text-black">We’re here to help</h1>
      <p class="px-4 text-gray-500">Our talented team of recruiters can help you find the best freelancer for the job and our technical co-pilots can even manage the project for you.</p>
    </div>
  </div>
          
          {/* <div className="features">
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
          </div> */}
        </div>

        <div className="whats-great">
          <h2 className="text-black"> What's great about it? </h2>
          <div class="grid gap-14 md:grid-cols-3 md:gap-5">
    <div class="rounded-xl bg-white p-6 text-center shadow-xl">
      <div
        class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
      </div>
      <h1 class="text-darken mb-3 text-xl font-medium lg:px-14 text-black">Fast bids</h1>
      <p class="px-4 text-gray-500">Receive obligation-free quotes from our talented freelancers fast. 80% of projects get bid on within 60 seconds.</p>
    </div>
    <div data-aos-delay="150" class="rounded-xl bg-white p-6 text-center shadow-xl">
      <div
        class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
          <svg viewBox=" 0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white">
        </svg>
      </div>
      <h1 class="text-darken mb-3 text-xl font-medium lg:px-14 text-black">Track progress</h1>
      <p class="px-4 text-gray-500">Keep up-to-date and on-the-go with what flexers are up to.</p>
    </div>
    <div data-aos-delay="300" class="rounded-xl bg-white p-6 text-center shadow-xl">
      <div
        class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
        <svg viewBox="0 0 55 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white">
          <path
            d="M8.25 19.25C11.2836 19.25 13.75 16.7836 13.75 13.75C13.75 10.7164 11.2836 8.25 8.25 8.25C5.21641 8.25 2.75 10.7164 2.75 13.75C2.75 16.7836 5.21641 19.25 8.25 19.25ZM46.75 19.25C49.7836 19.25 52.25 16.7836 52.25 13.75C52.25 10.7164 49.7836 8.25 46.75 8.25C43.7164 8.25 41.25 10.7164 41.25 13.75C41.25 16.7836 43.7164 19.25 46.75 19.25ZM49.5 22H44C42.4875 22 41.1211 22.6102 40.1242 23.5984C43.5875 25.4977 46.0453 28.9266 46.5781 33H52.25C53.7711 33 55 31.7711 55 30.25V27.5C55 24.4664 52.5336 22 49.5 22ZM27.5 22C32.8195 22 37.125 17.6945 37.125 12.375C37.125 7.05547 32.8195 2.75 27.5 2.75C22.1805 2.75 17.875 7.05547 17.875 12.375C17.875 17.6945 22.1805 22 27.5 22ZM34.1 24.75H33.3867C31.5992 25.6094 29.6141 26.125 27.5 26.125C25.3859 26.125 23.4094 25.6094 21.6133 24.75H20.9C15.4344 24.75 11 29.1844 11 34.65V37.125C11 39.4023 12.8477 41.25 15.125 41.25H39.875C42.1523 41.25 44 39.4023 44 37.125V34.65C44 29.1844 39.5656 24.75 34.1 24.75ZM14.8758 23.5984C13.8789 22.6102 12.5125 22 11 22H5.5C2.46641 22 0 24.4664 0 27.5V30.25C0 31.7711 1.22891 33 2.75 33H8.41328C8.95469 28.9266 11.4125 25.4977 14.8758 23.5984Z"
            fill="white"></path>
        </svg>
      </div>
      <h1 class="text-darken mb-3 pt-3 text-xl font-medium lg:h-14 lg:px-14 text-black">We’re here to help</h1>
      <p class="px-4 text-gray-500">Our talented team of recruiters can help you find the best freelancer for the job and our technical co-pilots can even manage the project for you.</p>
    </div>
  </div>
          {/* <div className="features">
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
          </div> */}
        </div>

        <div className="make-it-real">
          <h1 className="text-black">Make it Real with Flexer.</h1>
          {/* Gallery */}
          <div className="gallery">
            <ProductCategories />
          </div>
        </div>
        
        <div className="bg-black-100">
                <div className="container mx-auto">
                    <div role="article" className="bg-black-100 py-12 md:px-8">
                        <div className="px-4 xl:px-0 py-10">
                            <div className="flex flex-col lg:flex-row flex-wrap">
                                <div className="mt-4 lg:mt-0 lg:w-3/5">
                                    <div>
                                        <h1 className="text-3xl ml-2 lg:ml-0 lg:text-4xl font-bold text-black-900 tracking-normal lg:w-11/12">Frequently asked questions</h1>
                                    </div>
                                </div>
                                <div className="lg:w-2/5 flex mt-10 ml-2 lg:ml-0 lg:mt-0 lg:justify-end">
                                  
                                </div>
                            </div>
                        </div>
                        <div className="px-6 xl:px-0">
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-6 gap-8">
                                <div role="cell" className="bg-black-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full">
                                        {/* class="absolute inset-0 object-center object-cover h-full w-full"  */}
                                        <span>
                                            <img className="bg-black-200 p-2 mb-5 rounded-full flex" src="https://i.ibb.co/27R6nk5/home-1.png" alt="home-1" />
                                        </span>
                                        <h1 className="pb-4 text-2xl font-semibold">Account Overview</h1>
                                        <div className="my-5">
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full space-x-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                <h4 className="text-md text-black-900 dark:text-black-100">First time, what do I do next?</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full space-x-3">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100">Changing you profile picture and other information</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">I didnt get a confirmation email, what should I do next</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">What is the refund policy if I have to cancel during the month</h4>
                                            </div>
                                        </div>
                                        <a className="hover:text-indigo-500 hover:underline absolute bottom-5 text-sm text-indigo-700 font-bold cursor-pointer flex items-center" href="#">
                                            <p>Show All</p>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4338CA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                    <line x1={15} y1={16} x2={19} y2={12} />
                                                    <line x1={15} y1={8} x2={19} y2={12} />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="cell" className="bg-black-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full">
                                        {/* class="absolute inset-0 object-center object-cover h-full w-full"  */}
                                        <span>
                                            <img className="bg-black-200 p-2 mb-5 rounded-full" src="https://i.ibb.co/bdGyLYk/pricetags-1.png" alt="pricetags-1" />
                                        </span>
                                        <h1 className="pb-4 text-2xl font-semibold">Subscription Plans</h1>
                                        <div className="my-5">
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">First time, what do I do next?</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">Changing you profile picture and other information</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">I didnt get a confirmation email, what should I do next</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">What is the refund policy if I have to cancel during the month</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">What is the refund policy?</h4>
                                            </div>
                                        </div>
                                        <a className="hover:text-indigo-500 hover:underline absolute bottom-5 text-sm text-indigo-700 font-bold cursor-pointer flex items-center" href="#">
                                            <p>Show All</p>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4338CA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                    <line x1={15} y1={16} x2={19} y2={12} />
                                                    <line x1={15} y1={8} x2={19} y2={12} />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="cell" className="bg-black-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full">
                                        {/* class="absolute inset-0 object-center object-cover h-full w-full"  */}
                                        <span>
                                            <img className="bg-black-200 p-2 mb-5 rounded-full" src="https://i.ibb.co/GT4KHvJ/card-1.png" alt="home-1" />
                                        </span>
                                        <h1 className="pb-4 text-2xl font-semibold">Payment Options</h1>
                                        <div className="my-5">
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">First time, what do I do next?</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">Changing you profile picture and other information</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">I didnt get a confirmation email, what should I do next</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">What is the refund policy if I have to cancel during the month</h4>
                                            </div>
                                        </div>
                                        <a className="hover:text-indigo-500 hover:underline absolute bottom-5 text-sm text-indigo-700 font-bold cursor-pointer flex items-center" href="#">
                                            <p>Show All</p>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4338CA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                    <line x1={15} y1={16} x2={19} y2={12} />
                                                    <line x1={15} y1={8} x2={19} y2={12} />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="cell" className="bg-black-100">
                                    <div className="bg-white p-5 rounded-md  h-full relative w-full">
                                        {/* class="absolute inset-0 object-center object-cover h-full w-full"  */}
                                        <span>
                                            <img className="bg-black-200 p-2 mb-5 rounded-full" src="https://i.ibb.co/rG4r6NJ/notifications-1.png" alt="home-1" />
                                        </span>
                                        <h1 className="pb-4 text-2xl font-semibold">Notification Settings</h1>
                                        <div className="my-5">
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">First time, what do I do next?</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">Changing you profile picture and other information</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">I didnt get a confirmation email, what should I do next</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">What is the refund policy if I have to cancel during the month</h4>
                                            </div>
                                        </div>
                                        <a className="hover:text-indigo-500 hover:underline absolute bottom-5 text-sm text-indigo-700 font-bold cursor-pointer flex items-center" href="#">
                                            <p>Show All</p>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4338CA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                    <line x1={15} y1={16} x2={19} y2={12} />
                                                    <line x1={15} y1={8} x2={19} y2={12} />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="cell" className="bg-black-100">
                                    <div className="relative bg-white p-5 rounded-md relative h-full w-full">
                                        {/* class="absolute inset-0 object-center object-cover h-full w-full"  */}
                                        <span>
                                            <img className="bg-black-200 p-2 mb-5 rounded-full" src="https://i.ibb.co/HFC1hqn/people-1.png" alt="home-1" />
                                        </span>
                                        <h1 className="pb-4 text-2xl font-semibold">Profile Preferences</h1>
                                        <div className="my-5">
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">First time, what do I do next?</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">Changing you profile picture and other information</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">I didnt get a confirmation email, what should I do next</h4>
                                            </div>
                                        </div>
                                        <a className="hover:text-indigo-500 hover:underline absolute bottom-5 text-sm text-indigo-700 font-bold cursor-pointer flex items-center" href="#">
                                            <p>Show All</p>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4338CA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                    <line x1={15} y1={16} x2={19} y2={12} />
                                                    <line x1={15} y1={8} x2={19} y2={12} />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="cell" className="bg-black-100">
                                    <div className="relative bg-white p-5 rounded-md relative h-full  w-full">
                                        {/* class="absolute inset-0 object-center object-cover h-full w-full"  */}
                                        <span>
                                            <img className="bg-black-200 p-2 mb-5 rounded-full" src="https://i.ibb.co/QX80fYm/lock-closed-1.png" alt="home-1" />
                                        </span>
                                        <h1 className="pb-4 text-2xl font-semibold">Privacy and Cookies</h1>
                                        <div className="my-5">
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">First time, what do I do next?</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">Changing you profile picture and other information</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">I didnt get a confirmation email, what should I do next</h4>
                                            </div>
                                            <div className="flex items-center pb-4 dark:border-black-700 cursor-pointer w-full">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md text-black-900 dark:text-black-100 pl-4">What is the refund policy if I have to cancel during the month</h4>
                                            </div>
                                        </div>
                                        <a className="hover:text-indigo-500 hover:underline absolute bottom-5 text-sm text-indigo-700 font-bold cursor-pointer flex items-center" href="#">
                                            <p>Show All</p>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4338CA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                    <line x1={15} y1={16} x2={19} y2={12} />
                                                    <line x1={15} y1={8} x2={19} y2={12} />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="css-h9tkbh">
          
          <center>
            <section className="MuiContainer-root MuiContainer-maxWidthLg">
              <button
                className="MuiButton-root"
                onClick={handleButtonClick}
                ref={buttonRef}
              >
                <span className="MuiTypography-root MuiTypography-h4">
                  Got any questions? Need help?
                </span>
              </button>
              <h3 className="MuiTypography-root MuiTypography-subtitle1">
                We are here to help. Get in touch!
              </h3>
              <img
                className="productBuoy"
                src="../../../Images/svg/productBuoy.svg"
                alt="buoy"
              />
            </section>
          </center>
        </div>
      </div>


    </div>
    
    
  );
}

export default Home;
