import React from 'react';

//import './Home.css';
import heroimg from '../image/heroimg.jpg'

function Home(props) {
  return (
    <div className="home">  
    {/* hero section */}
          <div >
            <div>
              <h1>How work should work</h1>
            </div>

            <div>
              <p>Forget the old rules. You can have the best people. Right now. Right here.</p>
            </div>

            <div>
              <button>Get Started</button>
            </div>

            <img style={{width:1000, height : 1000}} src={heroimg}/>
          </div>

         {/* Need something done?  */}
         <div>
            <div>
              <h2>Need something done? </h2>
            </div>
            <div>
              <div>
                <div>
                  <h3>Post a job </h3>
                </div>
                <div>
                  <p>It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes. </p>
                </div>
              </div>

              <div>
                <div><h2>Choose freelancers </h2></div>

                <div>
                  <p>No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills. No job is too complex. We can get it done! </p>
                </div>
              </div>

              <div>
                <div><h2>Pay safely </h2></div>

                <div>Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system. </div>
              </div>

              <div>
                <div><h2>We’re here to help</h2></div>

                <div><p>Our talented team of recruiters can help you find the best freelancer for the job and our technical co-pilots can even manage the project for you. </p></div>
              </div>


            </div>
         </div>

         {/* What's great about it?  */}
          <div >
            <div>
              <h2>What's great about it? </h2>
            </div>
            <div>
              <div>
                <div><h3>Browse portfolios </h3></div>

                <div><p>Find professionals you can trust by browsing their samples of previous work and reading their profile reviews. </p></div>
              </div>
            </div>
            <div>
              <div>
                <div><h3>Fast bids  </h3></div>

                <div><p>Receive obligation free quotes from our talented freelancers fast. 80% of projects get bid on within 60 seconds. </p></div>

              </div>
              <div>
                <div><h3>Quality work   </h3></div>

                <div><p>Freelancer.com has by far the largest pool of quality freelancers globally- over 60 million to choose from. </p></div>


              </div>
              <div>
                <div><h3>Track progress    </h3></div>

                <div><p>Keep up-to-date and on-the-go with our time tracker, and mobile app. Always know what freelancers are up to. </p></div>

              </div>
            </div>
          </div>

          {/* Make it Real with Freelancer.  */}

          <div>
              <div>
                <h1>
                Make it Real with Freelancer. 
                </h1>
              </div>

              <div>
                <p>Get some inspiration from 1800+ skills </p>
              </div>
                {/* gallary */}
              <div>
                {/* for img path to display in gallary */}
              </div>

          </div>
         </div>
         
  )
}

export default Home;