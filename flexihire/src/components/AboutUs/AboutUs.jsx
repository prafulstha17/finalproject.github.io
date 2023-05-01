import './AboutUs.css';

function AboutUs() {
    return (
        <div className="about">
            <div class="responsive-container-block bigContainer">
                <div class="responsive-container-block Container">
                    <p class="text-blk heading">
                        About Us
                    </p>
                    <p class="text-blk subHeading">
                        Welcome to Flexihire, your go-to platform for finding and hiring talented freelancers. Our team at Flexihire consists of two passionate individuals dedicated to connecting skilled freelancers with clients who need their expertise.<br />
                        <br />
                        Our platform is designed to make it easy for businesses to find the right freelancer for their project, and for freelancers to find new opportunities. We've integrated LinkedIn into our platform to ensure that only the most qualified professionals are on our site.
                        <br />
                        <br />
                        At Flexihire, we're constantly working to improve our platform and provide the best possible experience for our users. Join our community today and take advantage of all the benefits Flexihire has to offer.
                        <br />
                        <br />
                        Thank you for choosing Flexihire.
                    </p>
                    <div class="social-icons-container">
                        <a href="https://www.facebook.com/profile.php?id=100092199707911" class="social-icon" target='_blank'>
                            <i className="fa-brands fa-facebook fa-2xl"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/flexi-hire-8437a0274" class="social-icon" target='_blank'>
                            <i class="socialIcon fa-brands fa-linkedin fa-2xl"></i>
                        </a>
                        <a href="https://www.instagram.com/hireflexi/" class="social-icon" target='_blank'>
                            <i class="fa-brands fa-instagram fa-2xl"></i>
                        </a>
                        <a href='https://twitter.com/HireFlexi' class="social-icon" target='_blank'>
                            <i class="fa-brands fa-twitter fa-2xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;