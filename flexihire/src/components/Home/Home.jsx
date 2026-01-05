import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listenToAuthChanges } from "../../config/AuthContext";
import ProductCategories from "./Pictures";
import { Typewriter } from 'react-simple-typewriter';

function Home() {
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
    <div className="min-h-screen bg-[#0a0e27] overflow-hidden">
      {/* Animated stars/dots background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full top-[10%] left-[15%] animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full top-[20%] right-[25%] animate-pulse delay-300"></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full bottom-[30%] left-[35%] animate-pulse delay-500"></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full top-[60%] right-[15%] animate-pulse delay-700"></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full bottom-[15%] right-[45%] animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-20 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Unleashing the Power</span>
                <br />
                <span className="text-white">of </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                  FlexiHire
                </span>
              </h1>

              <p className="text-gray-400 text-lg lg:text-xl max-w-xl leading-relaxed">
                Transforming industries with secure, decentralized, and transparent technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleGetStarted}
                  className="group relative px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  <span className="relative z-10">Get Started with FlexiHire</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  onClick={() => navigate("/about")}
                  className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
                >
                  Discover How It Works
                </button>
              </div>
            </div>

            {/* Right - Blockchain Illustration */}
            <div className="relative">
              <div className="relative">
                <img
                  src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
                  alt="FlexiHire Platform"
                  className="w-full h-auto relative z-10 drop-shadow-2xl"
                />
                {/* Glowing orbs around image */}
                <div className="absolute top-1/4 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why FlexiHire Section */}
      <section className="relative py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Why </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                FlexiHire?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              FlexiHire is redefining trust in the digital world. Here's why it matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Decentralization */}
            <div className="group relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Decentralization</h3>
                <p className="text-gray-400 text-sm">No single entity controls the system</p>
              </div>
            </div>

            {/* Card 2 - Security */}
            <div className="group relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Security</h3>
                <p className="text-gray-400 text-sm">Encrypted and tamper proof data</p>
              </div>
            </div>

            {/* Card 3 - Transparency */}
            <div className="group relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Transparency</h3>
                <p className="text-gray-400 text-sm">Public, accountable transactions</p>
              </div>
            </div>

            {/* Card 4 - Efficiency */}
            <div className="group relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Efficiency</h3>
                <p className="text-gray-400 text-sm">Faster, cost-effective processes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why FlexiHire Matters */}
      <section className="relative py-24 px-6 lg:px-20 bg-[#0d1229]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white">Why FlexiHire </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                  Matters
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                FlexiHire is revolutionizing how we handle data, transactions, and trust. By eliminating intermediaries and creating secure, transparent systems, FlexiHire is laying the foundation for a more efficient and fair digital future.
              </p>

              <button
                onClick={() => navigate("/about")}
                className="group relative px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Read More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="relative">
              <div className="relative">
                <img
                  src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg"
                  alt="Blockchain Technology"
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works / Need Something Done */}
      <section className="relative py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Need something done?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Get started with FlexiHire in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Post a Job</h3>
                <p className="text-gray-400">
                  It's free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Choose Freelancers</h3>
                <p className="text-gray-400">
                  No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Pay Safely</h3>
                <p className="text-gray-400">
                  Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Great About It */}
      <section className="relative py-24 px-6 lg:px-20 bg-[#0d1229]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What's great about it?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Fast Bids</h3>
                <p className="text-gray-400">
                  Receive obligation-free quotes from our talented freelancers fast. 80% of projects get bid on within 60 seconds.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Quality Work</h3>
                <p className="text-gray-400">
                  FlexiHire has by far the largest pool of quality freelancers globally to choose from.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sky-500/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Track Progress</h3>
                <p className="text-gray-400">
                  Keep up-to-date and on-the-go with what flexers are up to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 text-white">
            Make it Real with Flexer.
          </h2>
          <div>
            <ProductCategories />
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="relative py-24 px-6 lg:px-20 bg-[#0d1229]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Pricing </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                Plans
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Choose the plan that fits your needs and start exploring the power of FlexiHire today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Beginner Plan */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Beginner Plan</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-white">$199</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400 text-sm">Individuals new to FlexiHire</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Access to basic FlexiHire guides</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Community support</span>
                </div>
              </div>

              <button className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors duration-300">
                Get Started
              </button>
            </div>

            {/* Intermediate Plan - Popular */}
            <div className="relative bg-[#111633] border-2 border-cyan-500 rounded-xl p-8 transform scale-105 shadow-2xl shadow-cyan-500/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  POPULAR
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Intermediate Plan</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-white">$349</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400 text-sm">Users with some FlexiHire knowledge</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Everything in Beginner</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Advanced tutorials</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Priority support</span>
                </div>
              </div>

              <button className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors duration-300">
                Get Started
              </button>
            </div>

            {/* Advanced Plan */}
            <div className="relative bg-[#111633] border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Advanced Plan</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-white">$495</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400 text-sm">Professionals looking for advanced tools and insights</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Everything in Intermediate</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Dedicated account manager</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Custom integrations</span>
                </div>
              </div>

              <button className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-[#111633] border border-cyan-500/20 rounded-2xl p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl"></div>
            
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">
                Got any questions? Need help?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                We are here to help. Get in touch!
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="group relative px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
