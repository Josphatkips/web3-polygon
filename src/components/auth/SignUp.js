/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { LockClosedIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import url from '../url'

export default function SignUp() {

    const [email, setEmail]= useState('')
    const [name, setName]= useState('')
    const [password, setPassword]= useState('')
    const [confirm_password, setConfirmPassword]= useState('')
    const [error, setError]=useState('')
    const [errors, setErrors]=useState({})
    const [showAlert, setShowAlert] = useState(true);

    const createAccount=()=>{

      setError('')
      setErrors({})
      setShowAlert(false)

      axios.post(url+'auth/register',{
        confirm_password, password,email,name

      }).then(res=>{
        console.log(res)

      }).catch(e=>{
        
        if(e.response.status==422){
          console.log(e.response.data)
          setErrors(e.response.data)

          // console.log(errors.email)

        }else{
          // console.log(e)
          setError(e.message)
          setShowAlert(true)
        }
      }).then(res=>{
        

      })

    }

    // const rendererror= errors.map(error=>{
    //   console.log('error')
    //   console.log(error)

    // }

      

    // )
    const rendererror=()=>(
      <div
          className={
            "text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
          }
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">{error}!</b>  
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
    )
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* {rendererror} */}
          
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for free account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {/* Or{' '} */}
              <div href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Welcome to Realty View
              </div>
            </p>
          </div>
          <div>
          {showAlert ? (
        <>
        {rendererror()}
        </>
      ) : null}
          </div>
          <div className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm  space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your name"
                />
                {errors.name? <>
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors.name}
              </span>
                </>:<></>}
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email? <>
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors.email}
              </span>
                </>:<></>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password? <>
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors.password}
              </span>
                </>:<></>}
                
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={confirm_password}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {errors.confirm_password? <>
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors.confirm_password}
              </span>
                </>:<></>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Already have an account?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={()=>createAccount()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
