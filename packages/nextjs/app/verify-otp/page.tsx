'use client'
import { ARGENT_WALLET_DETECTOR_ADDRESS } from '@uniswap/sdk-core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import Header from '../../components/Header';
import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { name, email, phone, isMerchant } = router.query;
  const appAddress = process.env.NEXT_PUBLIC_KINTO_APP_ADDRESS
  if(!appAddress)
    throw new Error("KINTO APP ADDRESS IS NOT SET")

  const kintoSDK = createKintoSDK(appAddress);
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo>();
  
  useEffect(() => {
    // Generate a random 6-letter string
    const randomOTP = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOtp(`C8D7M 1 ${randomOTP}`);
    fetch(`/api/user/verify?otp=${randomOTP}&method=1`).then((response)=>{
      if (!response.ok) {
        alert("there is some issue please restart the process")
        router.push('/signup')
      }
    })

  }, [router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp);
    alert('OTP copied to clipboard!');
  };

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(`+919220592205`);
    alert('phone number copied to clipboard!');
  };


  const handleVerify = () => {
    // Here you would typically send the OTP to your backend for verification
    console.log("inside handle verify")
    fetch(`/api/user/verify?otp=${otp}&method=2`).then(async(response)=>{
      if (!response.ok) {
        alert("there is some issue please restart the process")
        router.push('/signup')
      }
      else{
      const data = await response.json()
     if( data.isVerified){

      await kintoSDK.createNewWallet();
      const newAccountInfo = await kintoSDK.connect();
      setAccountInfo(newAccountInfo);
      if(newAccountInfo){
        {  const userData={
          email,
          name,
          phoneNumber:phone,
          isMerchant,
          walletAddress:newAccountInfo.walletAddress   
        }
        const response = await fetch("/api/user/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        if (!response.ok) {
          console.log("reverting from user updation")
          alert("there is some issue please restart the process")
          router.push('/signup')
        }
        console.log("User Added")}
    

      }
    }
      else{
        alert("Verification failed. Please start from beginning")
        router.push('/signup')
      }
    }
    })


  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Verify Your Phone Number</h2>
          <div className="mb-4">
            <p className="text-lg font-medium">Your OTP:</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold">{otp}</span>
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              To verify your phone number, copy the above string and send it to this phone number:
              <br />
              <span className="font-medium"><button
                onClick={copyPhoneToClipboard}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                +919220592205
              </button></span>
              <br />
              After sending the message wait for 10 seonds and  click the verify button.
            </p>
          </div>
          <button
            onClick={handleVerify}
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Verify
          </button>
        </div>
      </main>
    </div>
  );
}
