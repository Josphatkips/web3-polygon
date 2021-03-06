import React, { useContext, useEffect } from 'react';

import Macbook from '../assets/macbook.svg'
import Header from '../assets/header.png'
import Stripe from './Stripe';
import Tabs from './Tabs';
import Nav from './Nav';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios';
import url from './url';
import { AuthContext } from '../App';
import { ethers } from "ethers";
// import {QRCodeSVG} from 'qrcode.react';
const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/5b4db9130fec05462817ab17/polygon/mumbai');

var user={}


const CreateWallet = () => {
  const { auth, dispatchAuth }=useContext(AuthContext)
//   const [, updateState] = React.useState();
// const forceUpdate = React.useCallback(() => updateState({}), []);



if(auth.logged_in){
  user=JSON.parse( auth.user)

}else{
  user={}
}

  useEffect(()=>{
    fetchWallet();

  },[])
  async function generateWallet(){
    const  wallet =  ethers.Wallet.createRandom()

    // console.log(wallet)

    // sessionStorage.setItem('mywallet', JSON.stringify(wallet));

    // dispatchAuth({type:'mywallet',value:JSON.stringify(wallet)})

    var token = sessionStorage.getItem('token', false)
  
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
              
            }
        };

        const parames={
          address:wallet.address,
          private_key:wallet.privateKey
        }

    axios.post(url+'client/wallet',parames,config)
      .then(res=>{
        // console.log(res)
        sessionStorage.setItem('mywallet', JSON.stringify(res.data.mywallet));

        dispatchAuth({type:'mywallet',value:JSON.stringify(res.data.mywallet)})
        dispatchAuth({type:'wallet_done',value:true})

      }).catch(e=>{
        // console.log(e)

      }).then(res=>{

        // console.log('why silent')

      })
    
    // const  wallet =  new ethers.Wallet( mykey,  provider  )
    // setNewWallet(wallet)
    // console.log(wallet.getBalance())

    // // const bal = await wallet.getBalance();

    // const balance = await provider.getBalance(wallet.address);
    // console.log(balance.toString()); // 0
    // setBlance(balance.toString())
}
const fetchWallet=()=>{
  // alert('yes')
 var token = sessionStorage.getItem('token', false)
  
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
              
            }
        };

    axios.get(url+'client/wallet',config)
    .then(res=>{

      // alert('yes')
      // console.log(res)

      if(!res.data.mywallet){
        generateWallet()

      }else{

         sessionStorage.setItem('mywallet', JSON.stringify(res.data.mywallet));

        dispatchAuth({type:'mywallet',value:JSON.stringify(res.data.mywallet)})
        dispatchAuth({type:'wallet_done',value:true})
        

      }

    }).catch(e=>{
      if(e.response.status==401){
        // Unauthenticated

        dispatchAuth({type:'login_status',value:false})
        dispatchAuth({type:'user',value:{}})
        // forceUpdate()

      }

    })
  }
    return (<>

{!auth.logged_in?<>
    <Navigate to="/logout" />

    
    
    
    </>:null}

    {/* <Nav /> */}
    <div class="h-full" style={{backgroundImage: `url(${Header})`}}>
      
      {/* <!--Nav--> */}
      <div class="w-full container mx-auto">
        <div class="w-full flex items-center justify-between">
          <a class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
          Realty<span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">View</span>
          </a>

          <div class="flex w-1/2 justify-end content-center">
            <Link to="/logout" class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                // type="button"
                >
              Logout
            </Link>
            &nbsp;
            &nbsp;
            <Link to="/cfmpy" class="bg-gradient-to-r from-blue-800 to-purple-500 hover:from-maroon-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                // type="button"
                >
              Main account
            </Link>
            <a class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="#">
              <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path
                  d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"
                ></path>
              </svg>
            </a>
            <a
              class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              href="#"
            >
              <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>


      {/* <!--Main--> */}
      <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {/* <!--Left Col--> */}
        <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Main
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              Hero Message
            </span>
            to sell yourself!
          </h1>
          <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-indigo-400">
            Sub-hero message, not too long and not too short. Make it just right!
          </p>

          <form class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                Signup for our newsletter
              </label>
              <input
                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                type="text"
                placeholder="you@somewhere.com"
              />
            </div>

            <div class="flex items-center justify-between pt-4">
              <button
                class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* <!--Right Col--> */}
        <div class="w-full xl:w-3/5 p-12 overflow-hidden">
          {/* <img class="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src={Macbook} /> */}

          <Tabs />
        </div>

        {/* <div class="mx-auto md:pt-16">
          <p class="text-blue-400 font-bold pb-8 lg:pb-6 text-center">
            Download our app:
          </p>
          <div class="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
            <img src={'AppStore'} class="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" />
            <img src={'PlayStore'} class="h-12 transform hover:scale-125 duration-300 ease-in-out" />
          </div>
        </div> */}

        {/* <!--Footer--> */}
        <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; Realty View 2022</a>
          {/* - Template by */}
          {/* <a class="text-gray-500 no-underline hover:no-underline" href="https://www.tailwindtoolbox.com">TailwindToolbox.com</a> */}
        </div>
      </div>
    </div>

    {/* <Stripe /> */}
    
    </>  );
}
 
export default CreateWallet;