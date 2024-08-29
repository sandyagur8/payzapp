'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo>();
  
  const appAddress = process.env.NEXT_PUBLIC_KINTO_APP_ADDRESS
  if(!appAddress)
    throw new Error("KINTO APP ADDRESS IS NOT SET")

  const kintoSDK = createKintoSDK(appAddress);

  useEffect(() => {
    const randomOTP = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOtp(`C8D7M 1 ${randomOTP}`);
    fetch(`/api/user/verify?otp=${randomOTP}&method=1`).then((response)=>{
      if (!response.ok) {
        alert("There is some issue. Please restart the process");
        router.push('/signup');
      }
    });
  }, [router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp);
    alert('OTP copied to clipboard!');
  };

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(`+919220592205`);
    alert('Phone number copied to clipboard!');
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(`/api/user/verify?otp=${otp}&method=2`);
      if (!response.ok) {
        throw new Error("Verification failed");
      }
      const data = await response.json();
      if (data.isVerified) {
        await kintoSDK.createNewWallet();
        const newAccountInfo = await kintoSDK.connect();
        setAccountInfo(newAccountInfo);
        if (newAccountInfo) {
          const userData = {
            email: searchParams.get('email'),
            name: searchParams.get('name'),
            phoneNumber: searchParams.get('phone'),
            isMerchant: searchParams.get('isMerchant'),
            walletAddress: newAccountInfo.walletAddress   
          };
          const createResponse = await fetch("/api/user/create", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
          if (!createResponse.ok) {
            throw new Error("Failed to create user");
          }
          setShowSuccessModal(true);
        }
      } else {
        throw new Error("Verification failed");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      alert("There is some issue. Please restart the process");
      router.push('/signup');
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    if (accountInfo?.walletAddress) {
      router.push(`/wallet?address=${accountInfo.walletAddress}`);
    } else {
      console.error("Wallet address is undefined");
      router.push('/signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
              <span className="font-medium">
                <button
                  onClick={copyPhoneToClipboard}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  +919220592205
                </button>
              </span>
              <br />
              After sending the message, wait for 10 seconds and click the verify button.
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

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Verification Successful!</h3>
            <p>Your account has been verified and created successfully.</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
