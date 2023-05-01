import React, { useState } from 'react'
import "./PageFooter.css"

function PageFooter() {

   const [show, setShow] = useState(false);
   const handleLinkClick = () => {
      setShow(false);
   }

   return (
      <div className="footerBody">
         <footer >
            <div class="footercontainer">
               <div class="row">

                  <div className="col">
                     <h4>For Client</h4>
                     <div class="links">
                        <a href="#">How to Hire</a>
                        <a href="#">Talent Marketplace</a>
                        <a href="#">Project Catalog</a>
                        <a href="#">Hire an Agency</a>
                        <a href="#">Any Hire</a>
                        <a href="#">Direct Contracts</a>
                     </div>

                  </div>
                  <div className="col">
                     <h4>For Talent</h4>
                     <div className="links">
                        <a href="#">How to Find Work</a>
                        <a href="#">Direct Contracts</a>
                        <a href="#">Find Freelance Jobs Worldwide</a>
                        <a href="#">Find Freelance Jobs in the Nepal</a>
                     </div>

                  </div>

                  <div class="col" id="useful-links">
                     <h4>About</h4>
                     <div class="links">
                        <a href="#">How it Work</a>
                        <a href="#">Services</a>
                        <a href="#">Privacy Policy</a>
                        <a href="/termsCondition" onClick={handleLinkClick}>Terms & Condition </a>
                        <a href="/whyUs" onClick={handleLinkClick}>Why Us?</a>
                     </div>
                  </div>

                  <div class="col" id="support">
                     <h4>Support</h4>
                     <div class="support-details">
                        <i class="fa-solid fa-envelope"></i>
                        <p>flexhirenepal@gmail.com</p>
                     </div><br/>
                     <div class="support-details">
                        <i class="fa fa-phone"></i>
                        <p>+977 98012345678</p>
                     </div>
                  </div>
               </div>

               <div className="col" id='followUs'>
                  <h4>Follow Us</h4>
                  <div class="social">
                     <a href="#"><i class="fab fa-facebook fa-2xl"></i></a>
                     <a href="#"><i class="fab fa-instagram fa-2xl"></i></a>
                     <a href="#"><i class="fab fa-youtube fa-2xl"></i></a>
                     <a href="#"><i class="fab fa-twitter fa-2xl"></i></a>
                     <a href="#"><i class="fab fa-linkedin fa-2xl"></i></a>
                  </div>
               </div>

               <div class="container">
                  <div class="copyright">
                     <div class="row">
                        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                           &copy; <a class="border-bottom" href="#">FlexiHire</a>, All Right Reserved.
                           <br />Designed By <a class="border-bottom" href="">Ajay Nemkul Shrestha</a> & <a class="border-bottom" href=""> Praful Shrestha</a>
                        </div>
                        <div class="col-md-6 text-center text-md-end">
                           <div class="footer-menu">
                              <a href="">Home</a>
                              <a href="">Cookies</a>
                              <a href="">Help</a>
                              <a href="">FAQs</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </footer >
      </div >
   )
}

export default PageFooter