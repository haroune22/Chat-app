import React, { useState } from 'react'
import Add from "../img/addAvatar.png"
import { useNavigate,Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';







const Login = () => {

  const navigate  =useNavigate()
  const [err,setErr]=useState(false)


  const handleSubmit = async(e)=>{
    e.preventDefault()

    const email = e.target[0].value;
    const password = e.target[1].value;
try {
await signInWithEmailAndPassword(auth, email, password)
navigate("/")
} catch (err) {
  setErr(true)
}
  
  }

  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className='logo'>Haroune Chat</span>
        <span className='title'>Login</span>
    <form onSubmit={handleSubmit}>
    <input type="email" placeholder='email..'/>
    <input type="password"placeholder='password....'/>

    <button>Sign in</button>
    {err && <span>Something went wrong!</span>}
    </form>
    <p>You don't have an account? 
      <Link to={"/Register"}>
      Register
      </Link></p>
    </div>
    </div>
  )
}

export default Login