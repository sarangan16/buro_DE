import React, { useState } from 'react'
import '../css/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEnvelope,faKey } from '@fortawesome/free-solid-svg-icons'

const Login = () => {

  const [action,setAction] = useState('Sign Up')

  return (
    <div className='container flex min-h-screen justify-center items-center bg-gray-200'>
      <div className='  w-96 p-6 shadow-lg rounded-md bg-white'>
        <div className='header mb-4'>
          <h2 className='text-3xl font-semibold text-center'>{action}</h2>
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faKey} />
          <hr />
        </div>
        <div className='login-input-group'>
        {action=== "Login" ? <div></div> : <div className='name-input relative'>
            <label for="name" className='block text-base mb-2'>Name</label>

            <input type="text" placeholder= "Name" className='border w-full rounded text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-cyan-600'/>
          </div>}
          
          <div className='email-input mt-2'>
          <label for="email" className='block text-base mb-2'>Email</label>
            <input type="email" placeholder='Email' className='border w-full rounded text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-cyan-600'/>
          </div>
          <div className='password-input mt-2'>
          <label for="password" className='block text-base mb-2'>Password</label>
            <input type="password" placeholder='Password' className='border w-full rounded text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-cyan-600'/>
          </div>
        </div>
        {action==="Sign Up"? <div></div> : <div className='forgot-password text-right mt-1'>
          <span>Forgot Password</span>
        </div>}
        
        <div className='login-button'>
          <button className={`action==="Sign Up"? "submit" : "submit" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={()=>{setAction("Login")}}>Login</button>
        </div>
        <div className='signup'>
          <button className={`action==="Login" ? "submit" : "submit bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2`} onClick={()=>{setAction("Sign Up")}}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Login
