import "./PageFooter.css";
import { ReactComponent as TwitterIcon } from "../images/x-twitter.svg";
import silhouette from "../Icon/silhouette/silhouette.png";

function PageFooter() {
  return (
    <div className="footerBody">
      <div className="silhouette">
        <img className="silhouette" src={silhouette} />
      </div>
      <footer>
        <div class="footercontainer">
          <div class="row">
            <div className="col">
              <h4>For Client</h4>
              <div class="links">
                <a href="/jobs">Talent Marketplace</a>
                <a href="#">Any Hire</a>
              </div>
            </div>
            <div className="col">
              <h4>For Talent</h4>
              <div className="links">
                <a href="/directContract">Direct Contracts</a>
                <a href="/jobs">Find Freelance Jobs in the Nepal</a>
              </div>
            </div>

            <div class="col" id="useful-links">
              <h4>About</h4>
              <div class="links">
                <a href="/howItWorks">How it Work</a>
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
          <center>
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
                  <TwitterIcon className="twitter-icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/flexi-hire-8437a0274"
                  target="_blank"
                >
                  <i class="fab fa-linkedin fa-2xl"></i>
                </a>
              </div>
            </div>
          </center>

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
                  <a class="border-bottom" href="https://www.instagram.com/ajay.nemkul/">
                    Ajay Nemkul Shrestha
                  </a>{" "}
                  &{" "}
                  <a class="border-bottom" href="https://www.instagram.com/prafulstha.17/">
                    {" "}
                    Praful Shrestha
                  </a>
                </div>
                <div class="col-md-6 text-center text-md-end">
                  <div class="footer-menu">
                    <a href="/">Home</a>
                    <a href="">Cookies</a>
                    <a href="">Help</a>
                    <a href="/faq">FAQs</a>
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
