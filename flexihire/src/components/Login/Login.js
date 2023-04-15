import React, {useState} from 'react'
import { auth } from "../../confg/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
  {/* error condition */}
  const [error,setError]= useState(false);

  const [email,setEmail]=useState("")
  const[password,setPassword]= useState("")

  // handleLogin
  const handleLogin =(e)=>{
    e.preventDefault();

    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    setError(true)
  });
  }


  return (
    <div class="center-wrap">
											<div class="section text-center">
												<h4 class="mb-4 pb-3" id="color-gradient">Log In</h4>
												<div class="form-group">
													<input type="email" name="logemail" class="form-style"
														placeholder="Your Email" id="logemail" autocomplete="off"
														required
                            onChange={e=>setEmail(e.target.value)}
                            />
													<i class="input-icon uil uil-at"></i>
												</div>
												<div class="form-group mt-2">
													<input type="password" name="logpass" class="form-style"
														placeholder="Your Password" id="logpass" autocomplete="off"
														required 
                            onChange={e=>setPassword(e.target.value)}
                            />
													<i class="input-icon uil uil-lock-alt"></i>
												</div>
												<div class="side mb-0 pb-3">
													<span>
														<div class="form-check">
															<input type="checkbox" name="rememberme"
																class="form-checkbox" id="rememberme"/>
															<p for="rememberme" id="color-gradient">Remember me</p>
														</div>
													</span>
													<span>
														<p><a href="#0" class="link" id="color-gradient">Forgot your
																password?</a></p>
													</span>
												</div>
												<button class="btn btn-info btn-lg btn-block btn-outline-danger "
													type="submit" onClick={handleLogin}>Login</button>
                                                      {error && <span>Wrong email or password</span>}

												<p class="or mt-4 text-center" id="color-gradient">Or login with</p>
												<ul class="social-links">
													<li><a href="#" id="color-gradient"><i
																class="fab fa-google"></i></a>
													</li>
													<li><a href="#" id="color-gradient"><i
																class="fab fa-facebook-f"></i></a></li>
													<li><a href="#" id="color-gradient"><i
																class="fab fa-twitter"></i></a>
													</li>
												</ul>
												<p class="mb-0 mt-4 text-center"><a href="#" class="join"
														onclick="create()" id="color-gradient">Not a member?
														Sign up</a></p>
											</div>
										</div>
    // <div className='login'>
      
    //   <form onSubmit={handleLogin}>
    //     <input type='email' placeholder='email' onChange={e=>setEmail(e.target.value)}/>
    //     <input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)} />
    //     <button type='submit' >Login</button>
    //     {error && <span>Wrong email or password</span>}
    //   </form>
    // </div>
  )
}

export default Login