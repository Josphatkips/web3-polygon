import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { TOKENABI } from './config/config';
const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/5b4db9130fec05462817ab17/polygon/mumbai');



const send_abi=TOKENABI

// https://ethereum.org/en/developers/tutorials/send-token-etherjs/#how-to-use

const Polygon = () => {
    const [newwallet, setNewWallet]=useState({})
    const [bal, mybal]=useState('hey')
    // const web3 = new Web3('https://rpc-mumbai.matic.today'); //test

// 0x6DC772CF5f51916aAB8C6D6d3BD0A9ccE25Ee519
// 0x4e071db91d22497880417e0922a513be817e3e5512ba22e9e9e9f1d53ae8e201
// https://mumbaifaucet.com/ 

const myaddress= "0x6DC772CF5f51916aAB8C6D6d3BD0A9ccE25Ee519"
const mykey= "0x4e071db91d22497880417e0922a513be817e3e5512ba22e9e9e9f1d53ae8e201"

const tokenaddress= "0x449897c439A87af2553784839BA2Fc5E95693992"
// const privateKey1Buffer = Buffer.from(mykey, 'hex')

// receiving address

// 0x755Fc6E00Bf9dFE4626B064d59EdCfa137E1E5C5
// 0x45eb249d616a7a7eeedd9c2391a205683457e55d22c9921362b7e42b53e97cf0

useEffect(()=>{
    // const  wallet =  ethers.Wallet.createRandom()
    // // const  wallet =  new ethers.Wallet( mykey,  provider  )
    // setNewWallet(wallet)
    

    // console.log(provider)
    // generateWallet()
    

},[])
async function generateWallet(){
    const  wallet =  ethers.Wallet.createRandom()
    // const  wallet =  new ethers.Wallet( mykey,  provider  )
    setNewWallet(wallet)
    console.log(wallet.getBalance())

    // const bal = await wallet.getBalance();

    const balance = await provider.getBalance(wallet.address);
    console.log(balance.toString()); // 0
}


// Start of token send

let private_key = mykey
let send_token_amount = "0.05"
let to_address = "0x755Fc6E00Bf9dFE4626B064d59EdCfa137E1E5C5"
let send_address = "myaddress"
let gas_limit = "0x100000"
let wallet = new ethers.Wallet(private_key)
// let walletSigner = wallet.connect(window.ethersProvider)
let contract_address =tokenaddress
// window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")


function send_token() {
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
        // let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 6)
        let numberOfTokens = send_token_amount
        console.log(`numberOfTokens: ${numberOfTokens}`)

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
    return ( <>
    {/* {bal} */}
    {newwallet.address}
    <br />
    {newwallet.privateKey}


    <button onClick={()=>send_token()}>Send Transaction</button>
    </> );
}
 
export default Polygon;