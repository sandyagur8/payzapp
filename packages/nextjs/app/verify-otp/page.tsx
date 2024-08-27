'use client'

import { useState, useEffect } from 'react';
// import Header from '../../components/Header';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Generate a random 6-letter string
    const randomOTP = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOtp(randomOTP);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp);
    alert('OTP copied to clipboard!');
  };

  const handleVerify = () => {
    // Here you would typically send the OTP to your backend for verification
    alert('Verification process initiated. This is a placeholder action.');
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
              <span className="font-medium">+91xxxxxxxxxxxxxxxx</span>
              <br />
              After sending the message, click the verify button.
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
