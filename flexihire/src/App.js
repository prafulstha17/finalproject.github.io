import React from 'react'
import Home from './components/Home/Home'
import SignUp from './components/Signup/SignUp'
import Login from './components/Login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App