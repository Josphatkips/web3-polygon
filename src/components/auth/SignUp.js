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
import { useContext, useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import url from '../url'

export default function SignUp() {

    const [email, setEmail]= useState('')
    const [name, setName]= useState('')
    const [spin, setSpin]= useState(false)
    const [success, setSucess]= useState(false)
    const [password, setPassword]= useState('')
    const [confirm_password, setConfirmPassword]= useState('')
    const [error, setError]=useState('')
    const [errors, setErrors]=useState({})
    const [showAlert, setShowAlert] = useState(false);

    const { auth, dispatchAuth } = useContext(AuthContext)

    console.log(auth)
    console.log('auth')

    const createAccount=()=>{

      setError('')
      setErrors({})
      setShowAlert(false)
      setSpin(true)

      axios.post(url+'auth/register',{
        confirm_password, password,email,name

      }).then(res=>{
        console.log(res)

        if (res.data.success) {
          // alert('success')
          // 1. Dispatch to context 
          var abc= res.data.result
          dispatchAuth({type:'login_status',value:true})
          dispatchAuth({type:'user',value:JSON.stringify(abc)})
          // 2. write to session storage

          sessionStorage.setItem('logged_in', true);
          sessionStorage.setItem('user', JSON.stringify(abc));
          sessionStorage.setItem('token', res.data.result.accessToken);

          setSucess(true)
        } else {
          // setError('Wrong username or password')
        }

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
        setSpin(false)
        

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

    {auth.logged_in?<>
    <Navigate to="/dashboard" />
    
    
    </>:null}
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
                </>:null}
                
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

            {spin?<>

              <div className='items-center mx-auto w-full'>
          <svg role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          </div>
            
            </>:null}
            
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
