'use client'

import { useState, useEffect } from 'react';
// import Header from './Header';

export default function OfflineTransactionInstructionsContent() {
  const [transactionCode, setTransactionCode] = useState('');

  useEffect(() => {
    // Generate a random transaction code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTransactionCode(code);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionCode);
    alert('Transaction code copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Offline Transaction Instructions</h2>
          <div className="mb-4">
            <p className="text-lg font-medium">Your Transaction Code:</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold">{transactionCode}</span>
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
              To complete your offline transaction, please follow these steps:
              <ol className="list-decimal list-inside mt-2">
                <li>Copy the transaction code above.</li>
                <li>Send an SMS with the following format to +91XXXXXXXXXX:</li>
                <li className="ml-4">SEND [Transaction Code] [Amount]</li>
                <li>For example: SEND {transactionCode} 100</li>
                <li>Wait for a confirmation SMS to complete the transaction.</li>
              </ol>
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Wallet
          </button>
        </div>
      </main>
    </div>
  );
}
