import React from 'react'

function Home(props) {
  return (
    <div className='text-center'>
      <br/>
      <br/>
      <h2>{props.name ? `Welcome - ${props.name}` : "Login to start working as Flexer."}</h2>
    </div>
    
  )
}

export default Home