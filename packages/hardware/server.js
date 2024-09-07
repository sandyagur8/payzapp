const express = require('express');
//const { createClient } = require('@supabase/supabase-js');
const { ethers } = require("ethers");
const { formatUnits } = require("viem");
const {createPublicClient,http} = require("viem")
const axios = require('axios');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const provider = new ethers.JsonRpcProvider('https://sepolia.base.org/');
const usdcAddress = '0x49b26d8D6Fef9A3Ed91E663E01Aa91D16fE6ddC5';
const accountAddress = '0x67806841457F2402a103b7A5150589D4dBb8E329';

const abi = require('./abi.js');
const { USDC_ABI,kinto,usdc_address } = require('./utils.js');

// async function getUSDCInfo() {
//   // Create contract instance with the extended ABI
//   const contract = new ethers.Contract(usdcAddress, abi, provider);
//   try {
//     // Call multiple functions using the extended ABI
//     const balance = await contract.balanceOf(accountAddress);
//     // Format the balance
//     const formattedBalance = ethers.formatUnits(balance, 18);  
//    

//   } catch (error) {
//     console.error('Error:', error);
//   }

// }

async function getUSDCInfo(){

   const publicClient = createPublicClient({
    chain: kinto,
    transport: http()
  })

  const balance=await publicClient.readContract({
    address:usdc_address,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args:['0x67806841457F2402a103b7A5150589D4dBb8E329']
  })
  const formattedBalance = ethers.formatUnits(balance, 18);
  console.log(`Balance: ${formattedBalance}`);
  return formattedBalance;
}

let prev_value=0

async function pooling() {
  while(true){
  const data= await getUSDCInfo();
  // const data= await getBalance(accountAddress);
  if (Number(prev_value)== 0||Number(prev_value)==Number(data)){
    console.log(Number(prev_value))
    console.log(Number(data))
      }
  else{
    if(Number(prev_value)>Number(data)){
        console.log("enter")
        fetchAndSend(30);   //10dollars sent
      }
    else{
      console.log("enter_1")
      fetchAndSend(10);   //10dollars recieved
    }
  }
    prev_value =data
    await delay(5000);
}
}

pooling();
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


pooling();
//fetchAndSend(30);


async function fetchAndSend(condition) {
  try {

    const hex_list_1=[condition]
    console.log(hex_list_1)
    // Send to NodeMCU
    await sendToNodeMCU(hex_list_1);

    console.log(`Fetched and Sent to NodeMCU: ${condition}`);
  } catch (error) {
    console.error(`Error fetching and sending: ${condition}:`, error);
  }
}

async function sendToNodeMCU(hexList) {
  const nodeMCUUrl = 'http://192.168.29.87/receive_list';
  try {
    await axios.post(nodeMCUUrl, { hexList });
    console.log('List sent successfully to NodeMCU');
  } catch (error) {
    console.error('Failed to send list to NodeMCU:', error);
  }
}

const USDCAddress ='0x0953BBb3F1790B9f763778466858925a53D336B9'      ;
// interface TokenItem {
//   token: {
//       address: string;
//       circulating_market_cap: number | null;
//       decimals: string;
//       exchange_rate: number | null;
//       holders: string;
//       icon_url: string | null;
//       name: string;
//       symbol: string;
//       total_supply: string;
//       type: string;
//       volume_24h: number | null;
//   };
//   token_id: string | null;
//   token_instance: string | null;
//   value: bigint;
// }

async function getBalance(accountAddress) {
    const url = `https://explorer.kinto.xyz/api/v2/addresses/${accountAddress}/tokens?type=ERC-20`;

    const response = await fetch(url);

    if (!response.ok)
        return Error("Can't get balance");

    const data = await response.json();

    for (const item of data.items) {
        if ((item.token.address).toLowerCase() == USDCAddress?.toLowerCase()) {
            console.log("balance:", formatUnits(item.value, 18))
            return formatUnits(item.value, 18);
        }
    }

    return 0;
}




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});