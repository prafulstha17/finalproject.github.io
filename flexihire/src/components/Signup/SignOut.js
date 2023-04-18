import React from 'react'
import { auth } from '../../confg/firebase';
import { useNavigate } from 'react-router-dom';
function SignOut() {
    const navigate = useNavigate();
    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            // Sign-out successful
            navigate("/login");
            
          })
          .catch((error) => {
            // Sign-out failed
          });
      };
    
  return (
    <button onClick={handleSignOut}>Sign Out</button>  )
}

export default SignOut