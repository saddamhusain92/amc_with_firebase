import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { auth, userscollectionRef } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const navigate = useNavigate()
  const initialState = {
    email:"", 
    password:"",
  }
  const[data,setData] = useState(initialState)
  const[errmsg,setErrsmg] = useState("")

 

  const formSubmit = async(e)=>{
    e.preventDefault()
    const {email,password} = data
    
      signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      toast.success("You are successfully logged in") 
      setInterval(()=>{
         navigate("/profile")
      },3000)
      
      // ...
    })
    .catch((error) => {
      setErrsmg(error.code.split("/")[1]);
    }); 
    } 
  
  

    return (
      <>
         <ToastContainer/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={formSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={(e)=>setData({...data,email:e.target.value})}
                    
                   
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-green-900 hover:text-green-900">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e)=>setData({...data,password:e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div >
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>

                <div className='text-center p-4'>
                
                <p className="mt-10 text-center text-sm text-gray-500">
                Create a Abhilasha Marketing company  Account?{' '}
            <NavLink to={"/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Register
            </NavLink>
          </p>
                </div>
              </div>
            </form>
  
          </div>
        </div>
      </>
    )
  }
  