import React, { useEffect, useState } from 'react'
import Home from './components/Home/Home'
import SignUp from './components/Signup/SignUp'
import Login from './components/Login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { auth } from './confg/firebase'

function App() {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path="/" element={<Home name={userName} />} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App