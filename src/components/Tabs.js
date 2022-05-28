import { useContext, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import Stripe from './Stripe'
import { ethers } from "ethers";
import {QRCodeCanvas} from 'qrcode.react';
import { AuthContext } from '../App';
import { TOKENABI, TOKENADDRESS } from './config/config';
const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/5b4db9130fec05462817ab17/polygon/mumbai');

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

var wallet={}

export default function Tabs() {
  const [newwallet, setNewWallet]=useState({})
  const [balance, setBlance]=useState('')
  const [balancestr, setBlanceStr]=useState('')
  const { auth, dispatchAuth } =  useContext(AuthContext)

  
  
  if(auth.wallet_done){
    wallet=JSON.parse( auth.mywallet)
    getMyBlance()


  }else{
    wallet={}

  }



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

  async function getMyBlance(){

     // alert();
   const contract= new ethers.Contract( TOKENADDRESS , TOKENABI , provider )

   //    console.log(contract.balanceOf('0x82BBa17EBd3cC23D5Bf5aC8f11FCEEa5E7274417'))
   
      const bal= await contract.balanceOf(wallet.address)
   
      // console.log(bal)
      // setBlanceStr(bal.format('ether'))
      // console.log(ethers.utils.formatUnits(bal, 6))
      setBlance(ethers.utils.formatUnits(bal, 18))


    
    // const balance = await provider.getBalance(wallet.address);
    // // console.log(balance.toString()); 
    // setBlance(balance.toString())

    // // return balance.toString()
  }


  useEffect(()=>{

  },[])

  const downloadQRCode = () => {
    
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = 'RealthyView.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

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
                Your Balance is: {balance}
                <div class="mb-4">
              <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                Address
              </label>
              <textarea
                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                type="text"
                value={wallet.address}
                readOnly
                // placeholder="you@somewhere.com"
              />
            </div>
                {/* <div class="mb-4">
              <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                Your Private Key
              </label>
              <textarea
                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                type="text"
                value={newwallet.privateKey}
                readOnly
                
              />
            </div> */}

                <div className='flex flex-col'>

                  {auth.wallet_done?<>
                    <QRCodeCanvas 
                // value={`Address: ${wallet.address} Private Key: ${wallet.private_key}`} 
                value={`Address: ${wallet.address}`} 
                // value={ wallet.address+wallet.private_key} 
                
                id="qr-gen" />

                  </>:null}
                  
                

                <p>
        Click for{" "}
        <button type="button" onClick={downloadQRCode}>
          Download Address QR Code
        </button>
      </p>
                    
                    {/* <div>
                    <div class="flex items-center justify-between pt-4">
                        <button
                            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                            type="button"
                            onClick={()=>generateWallet()}
                        >
                            Create Wallet
                        </button>
                    </div>

                    </div> */}

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
                    <input
                                class="shadow appearance-none border border-indigo-400 rounded p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                id="emailaddress"
                                type="text"
                                placeholder="Receipient Address"
                            />
                
                    
                    <div>
                        
                        
                    <div class="flex items-start justify-between pt-4  flex-col space-y-3">
                        
                        
                        <div className='flex flex-col space-y-3'>
                            
                            <div>
                            <input
                                class="shadow appearance-none border border-indigo-400 rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
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
