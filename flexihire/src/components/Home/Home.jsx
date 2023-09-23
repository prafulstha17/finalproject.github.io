import React from 'react';
import PostStatus from '../postfeed/PostStatus';
import RetrievePosts from '../postfeed/RetrievePosts';
//import './Home.css';

function Home(props) {
  return (
    <div className="home">
         <PostStatus/>
         <RetrievePosts/>
        {/* <h2>{props.name ? `Welcome - ${props.name}` : "Login to start working as Flexer."}</h2> */}
         </div>
         
  )
}

export default Home;