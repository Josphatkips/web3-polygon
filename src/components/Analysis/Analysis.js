import React from 'react';

import { ethers } from "ethers";

import { Tab } from '@headlessui/react'
import Chart from './Chart';
// import CryptoList from './CryptoList';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// https://codesandbox.io/s/hpo28?file=/src/pages/Home.js
// https://codesandbox.io/s/me5vnd?file=/src/App.js
// https://www.npmjs.com/package/react-crypto-chart

const provider = new ethers.providers.Web3Provider(window.ethereum)

const Analysis = () => {

  async function connectMetamask(){
   const accounts= await provider.send("eth_requestAccounts", []);

   console.log(accounts)

  }
    return ( <body class="antialiased font-ssans flex bg-blue-200 h-screen w-full flex-col">

       


<Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          
            <Tab
              key={1}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {'Chart'}
            </Tab>
            <Tab
              key={2}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {'Coin List'}
            </Tab>
       
        </Tab.List>
        <Tab.Panels className="mt-2">
          
            <Tab.Panel
              key={'idx'}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 w-full'
              )}
            >

                {/* <CryptoList />  */}
                <Chart />
            
            </Tab.Panel>
            <Tab.Panel
              key={'idx2'}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >

                Second
            
            </Tab.Panel>
          
        </Tab.Panels>
      </Tab.Group>

        
   
  </body> );
}
 
export default Analysis;