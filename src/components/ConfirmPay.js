import React, { useState } from 'react';
import { TOKENABI } from './config/config';
import { ethers } from "ethers";
import axios from 'axios';
import url from './url';

const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/5b4db9130fec05462817ab17/polygon/mumbai');
const tokenaddress= "0x449897c439A87af2553784839BA2Fc5E95693992"
const send_abi =TOKENABI

const myaddress= "0x6DC772CF5f51916aAB8C6D6d3BD0A9ccE25Ee519"
const mykey= "0x4e071db91d22497880417e0922a513be817e3e5512ba22e9e9e9f1d53ae8e201"

// const tokenaddress= "0x449897c439A87af2553784839BA2Fc5E95693992"

const Confirm = () => {
    const [address,setAddress]=useState('')
    const [amount, setAmount]=useState('')
    const [error, setError]=useState('')

    async function fetchBal(){

        const conv= ethers.utils.formatEther(amount)

        console.log(conv)
        // alert();
    //    const contract= new ethers.Contract( tokenaddress , TOKENABI , provider )

    // //    console.log(contract.balanceOf('0x82BBa17EBd3cC23D5Bf5aC8f11FCEEa5E7274417'))

    //    const bal= await contract.balanceOf('0x82BBa17EBd3cC23D5Bf5aC8f11FCEEa5E7274417')

    //    console.log(bal)
    //    console.log(ethers.utils.formatUnits(bal, 6))
    }

    // async function getactualBalance(){
    //     const balance = await 
    // }


    const fetchCred=()=>{
        var token = '39|wixKNXZGKeLYcOcQ5RgMg6rSjUyjQuynYMfCnLno'
  
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
              
            }
        };
        
        axios.get(url+'client/ctl',config)
        .then(res=>{
            console.log(res)
            sendCrypto(res.data.ctl)

        }).catch(e=>{
            console.log(e)

        }).then(r=>{
            console.log(r)

        })
    }


    

    const sendCrypto=(ctl)=>{

        // const conv= ethers.utils.formatEther(amount)

        // console.log(conv)


        // return

        let private_key = ctl.private_key
        let send_token_amount = amount
        let to_address = address
        let send_address = ctl.address
        let gas_limit = "0x100000"
        // let wallet = new ethers.Wallet(private_key)
        // let walletSigner = wallet.connect(window.ethersProvider)
        let contract_address =tokenaddress

        let wallet = new ethers.Wallet(private_key)
    let walletSigner = wallet.connect(provider)
  
    walletSigner.getGasPrice().then((currentGasPrice) => {
      // let gas_price = 8000000000
      let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
      console.log(`gas_price: ${gas_price}`)
  
      if (contract_address) {
        // general token send
        console.log('genrate send')
        let contract = new ethers.Contract(
          contract_address,
          send_abi,
          walletSigner
        )
  
        // How many tokens?
        let numberOfTokens = amount
        // let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
        console.log(`numberOfTokens: ${send_token_amount}`)

        // return
  
        // Send tokens
        contract.transfer(to_address, numberOfTokens).then((transferResult) => {
          console.log(transferResult)
          alert("sent token")
        })
      } // ether send
      else {
        const tx = {
          from: send_address,
          to: to_address,
          value: ethers.utils.parseEther(send_token_amount),
          nonce: window.ethersProvider.getTransactionCount(
            send_address,
            "latest"
          ),
          gasLimit: ethers.utils.hexlify(gas_limit), // 100000
          gasPrice: gas_price,
        }
        console.dir(tx)
        try {
          walletSigner.sendTransaction(tx).then((transaction) => {
            console.dir(transaction)
            alert("Send finished!")
          })
        } catch (error) {
          alert("failed to send!!")
        }
      }
    })

    }
    return ( <div className=' mx-10 md:mx-52'>
        <div className='flex md:w-1/2 flex-col mx-auto' >
            <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address to Send to</label>
            <input type="email" id="email" value={address} onChange={(e)=>setAddress(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com" required="" />
            </div>
            <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
            </div>
            <div class="flex items-start mb-6">
            {/* <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
            </div> */}
            {/* <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label> */}
            </div>
            <button 
            onClick={()=>fetchCred()}
             class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>


    </div> );
}
 
export default Confirm;