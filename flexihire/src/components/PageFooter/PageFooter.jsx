import React from 'react'
import "./PageFooter.css"

function PageFooter() {
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
                        <a href="#">About us</a>
                        <a href="#">How it Work</a>
                        <a href="#">Services</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Condition </a>
                        <a href="#">Help</a>
                     </div>
                  </div>

                  <div class="col" id="support">
                      <h4>Support</h4>
                      <div class="support-details">
                         <i class="fa-solid fa-envelope"></i>
                         <p>flexhire@gmail.com</p>
                      </div>
                      <div class="support-details">
                         <i class="fa fa-phone"></i>
                         <p>+977 98012345678</p>
                      </div>
                  </div>
            </div>

            <div className="col">
            <div class="social">
                        <a href="#"><i class="fab fa-facebook fa-2xl"></i></a>
                        <a href="#"><i class="fab fa-instagram fa-2xl"></i></a>
                        <a href="#"><i class="fab fa-youtube fa-2xl"></i></a>
                        <a href="#"><i class="fab fa-twitter fa-2xl"></i></a>
                        <a href="#"><i class="fab fa-linkedin fa-2xl"></i></a>
                      </div>
            </div>

        </div>
     </footer>
     </div>
  )
}

export default PageFooter