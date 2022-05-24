import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Stripe from './Stripe'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  let [categories] = useState({
    "Buy Asset": [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      
    ],
   " My Wallet": [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      
    ],
   "Send Asset": [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      
    ],
   
  })

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
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
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          
            <Tab.Panel
              key={1}
              className={classNames(
                'rounded-xl bg-white py-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              
              <Stripe />
              
            </Tab.Panel>
            <Tab.Panel
              key={2}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
                {/* Wallet */}

                <div className='flex flex-col'>
                    <div>
                        <span className='text-indigo-400 text-2xl font-black'>My Wallet</span>
                        <div class="flex items-center justify-between pt-4">
                        
                        </div>
                        
                    </div>
                    <div>
                    <div class="flex items-center justify-between pt-4">
                        <button
                            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                            type="button"
                            onClick={()=>alert()}
                        >
                            Create Wallet
                        </button>
                    </div>

                    </div>

                </div>
              
              
            </Tab.Panel>
            <Tab.Panel
              key={2}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
                {/* Send Crypto */}

                <div className='flex flex-col'>
                    <div>
                        <span className='text-indigo-400 text-2xl font-black'>Send Asset</span>
                        <div class="flex items-center justify-between pt-4">
                        
                        </div>
                        
                    </div>
                    <div>
                    <div class="flex items-start justify-between pt-4  flex-col space-y-3">
                        <div className='flex flex-col space-y-3'>
                            <div className='w-1/4'>
                            <input
                                class="shadow appearance-none border rounded w-/4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                id="emailaddress"
                                type="text"
                                placeholder="Receipient Address"
                            />
                            </div>
                            <div>
                            <input
                                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                id="emailaddress"
                                type="text"
                                placeholder="Amount to transfer"
                            />

                            </div>
                            
                        </div>
                        <div>
                        <button
                            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                            type="button"
                            onClick={()=>alert()}
                        >
                            Send Asset
                        </button>

                        </div>
                    </div>

                    </div>

                </div>
              
              
            </Tab.Panel>
         
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
