import "./PageFooter.css";
import silhouette from "../Icon/silhouette/silhouette.png";

function PageFooter() {
  return (
    <div className="footerBody">
      <div className="silhouette">
        <img className="silhouette" src={silhouette}/>
      </div>
      <footer>
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
                <a href="#">Find Freelance Jobs in the Nepal</a>
              </div>
            </div>

            <div class="col" id="useful-links">
              <h4>About</h4>
              <div class="links">
                <a href="/admin">How it Work</a>
                <a href="/services">Services</a>
                <a href="#">Privacy Policy</a>
                <a href="/termsCondition">Terms & Condition </a>
                <a href="/whyUs">Why Us?</a>
              </div>
            </div>

            <div class="col" id="support">
              <h4>Support</h4>
              <div class="support-details">
                <i class="fa-solid fa-envelope"></i>
                <p>flexhirenepal@gmail.com</p>
              </div>
              <br />
              <div class="support-details">
                <i class="fa fa-phone"></i>
                <p>+977 98012345678</p>
              </div>
            </div>
          </div>

          <div className="col" id="followUs">
            <h4>Follow Us</h4>
            <div class="social">
              <a
                href="https://www.facebook.com/profile.php?id=100092199707911"
                target="_blank"
              >
                <i class="fab fa-facebook fa-2xl"></i>
              </a>
              <a href="https://www.instagram.com/hireflexi/" target="_blank">
                <i class="fab fa-instagram fa-2xl"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UC0ntZYXMAsvcgrKLWyHMe5Q"
                target="_blank"
              >
                <i class="fab fa-youtube fa-2xl"></i>
              </a>
              <a href="https://twitter.com/HireFlexi" target="_blank">
                <i class="fab fa-twitter fa-2xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/flexi-hire-8437a0274"
                target="_blank"
              >
                <i class="fab fa-linkedin fa-2xl"></i>
              </a>
            </div>
          </div>

          <div class="container">
            <div class="copyright">
              <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  &copy;{" "}
                  <a class="border-bottom" href="#">
                    FlexiHire
                  </a>
                  , All Right Reserved.
                  <br />
                  Designed By{" "}
                  <a class="border-bottom" href="">
                    Ajay Nemkul Shrestha
                  </a>{" "}
                  &{" "}
                  <a class="border-bottom" href="">
                    {" "}
                    Praful Shrestha
                  </a>
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
      </footer>
    </div>
  );
}

export default PageFooter;
