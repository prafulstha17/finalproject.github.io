import React from 'react';
import './Home.css';

function Home(props) {
  return (
    <div className="home">
      <div className='text-center'>
        <br />
        <br />
        <h2>{props.name ? `Welcome - ${props.name}` : "Login to start working as Flexer."}</h2>
      </div>
    </div>
  )
}

export default Home;