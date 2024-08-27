'use client'

import { useState } from 'react';
import SendModal from './SendModal';
import ReceiveModal from './ReceiveModal';
import TransactionHistory from './TransactionHistory';

export default function WalletContent() {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [balance, setBalance] = useState(1000); // Example balance
  const username = "John Doe"; // Example username

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
          <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setIsSendModalOpen(true)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Funds
          </button>
          <button
            onClick={() => setIsReceiveModalOpen(true)}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Receive Funds
          </button>
        </div>
        <TransactionHistory />
      </main>
      {isSendModalOpen && (
        <SendModal onClose={() => setIsSendModalOpen(false)} />
      )}
      {isReceiveModalOpen && (
        <ReceiveModal onClose={() => setIsReceiveModalOpen(false)} />
      )}
    </div>
  );
}
