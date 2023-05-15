import React from 'react';
import './Home.css';

function Home(props) {
  return (
    <div className="home">
        <h2>{props.name ? `Welcome - ${props.name}` : "Login to start working as Flexer."}</h2>
    </div>
  )
}

export default Home;