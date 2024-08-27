"use client"
import {Header} from '../../components/Header'
import SignInForm from '../../components/SignInForm'
import { useState } from 'react';
import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';

const appAddress = "0x9A33eF90660321a8aeAfDca271d594d5b052E2DE";
const kintoSDK = createKintoSDK(appAddress);

export default function SignIn() {
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo>();

  const handleClick = async () => {
    console.log('Button clicked');
    kintoSDK.createNewWallet()
      .then(async(accountInfo) => {
        // console.log('Connected account info:', await kintoSDK.connect());
        // setAccountInfo(accountInfo);
      })
      .catch((error) => {
        console.error('Failed to connect:', error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* <SignInForm /> */}
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleClick}
          >
            Sign in using Kinto Wallet
          </button>
        </div>
      </main>
    </div>
  );
}