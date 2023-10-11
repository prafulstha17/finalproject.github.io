import "./WhyUs.css";

function WhyUs() {
  return (
    <>
      <section class="banner-area relative" id="home">
        <div class="overlay overlay-bg"></div>
        <div class="container">
          <center>
            <div class="row d-flex align-items-center justify-content-center">
              <div class="about-content col-lg-12">
                <h1 class="text-white">About</h1>
                <p class="text-white link-nav">
                  <a href="#">About</a> <i class="fa-solid fa-arrow-right"> </i>
                  <a href="#">Why Us?</a>
                </p>
              </div>
            </div>
          </center>
        </div>
      </section>
      <section class="service-area section-gap" id="service">
        <div class="container">
          <center>
            <div class="row d-flex justify-content-center">
              <div class="col-md-8 pb-40 header-text">
                <h2>Why Choose Us</h2>
                <p>Who are in extremely love with eco friendly system.</p>
              </div>
            </div>
          </center>
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="single-service">
                <div className="card-why-us">
                  <h4>
                    <i class="fa-solid fa-user fa-xs"> </i> Expert Technicians
                  </h4>
                  <p>
                    We understand the importance of having skilled and
                    experienced technicians for your projects. That's why we
                    have a team of expert technicians who are always available
                    to work with you.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-service">
                <div className="card-why-us">
                  <h4>
                    <i class="fa-solid fa-id-card"> </i> Professional Service
                  </h4>
                  <p>
                    FlexiHire offers professional services with a team of highly
                    skilled technicians who are trained and experienced in their
                    respective fields, ensuring that all services are performed
                    to the highest standards.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-service">
                <div className="card-why-us">
                  <h4>
                    <i class="fa-solid fa-tty"> </i> Great Support
                  </h4>
                  <p>
                    We are dedicated to being available around the clock to
                    answer your questions, offer advice and provide assistance
                    whenever you need it. Flexihire is committed to providing
                    great support to our clients.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-service">
                <div className="card-why-us">
                  <h4>
                    <i class="fa-solid fa-rocket"> </i> Technical Skills
                  </h4>
                  <p>
                    Flexihire offers access to highly skilled and experienced
                    technicians who can handle various technical challenges with
                    ease ensuring that your projects are completed efficiently
                    and effectively.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-service">
                <div className="card-why-us">
                  <h4>
                    <i class="fa-regular fa-gem"> </i> Highly Recomended
                  </h4>
                  <p>
                    We are proud to offer services that come highly recommended
                    by our satisfied customers. You can trust us to exceed your
                    expectations and provide you with a seamless and enjoyable
                    experience.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-service">
                <div className="card-why-us">
                  <h4>
                    <i class="fa-regular fa-comment"> </i> Positive Reviews
                  </h4>
                  <p>
                    Our team is dedicated to ensuring that your experience with
                    us is nothing short of excellent. From start to finish, we
                    strive to exceed your expectations and leave you with a
                    smile on your face.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="feature-area">
        <div class="container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-3 no-padding feat-txt">
              <h6 class="text-uppercase text-white">Who we are</h6>
              <p>
                We are a duos collaborating on the
                development of a website with an intuitive
                interface.
              </p>
            </div>
            <div class="col-lg-3 no-padding feat-txt">
              <h6 class="text-uppercase text-white">What we do</h6>
              <p>
                We connect job seekers with top employers and provide tools and
                resources to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyUs;
