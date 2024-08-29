'use client'

import { useState, useEffect } from 'react';
import SendModal from './SendModal';
import ReceiveModal from './ReceiveModal';
import TransactionHistory from './TransactionHistory';
import { user_props } from '~~/app/lib/interfaces';
// import { createKintoSDK,KintoAccountInfo } from 'kinto-web-sdk';

// const appAddress = process.env.KINTO_APP_ADDRESS;
// if (!appAddress) {
//   throw new Error('KINTO_APP_ADDRESS is not defined');
// }
// const kintoSDK = createKintoSDK(appAddress);

interface WalletContentProps {
  wallet_connect: user_props;
}

const WalletContent: React.FC<WalletContentProps> = ({ wallet_connect }) => {

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [accountInfo, setaccountInfo] = useState<KintoAccountInfo |null>(null);

  // kintoSDK.connect()
  // .then((accountInfo) => {
  //   console.log('Connected account info:', accountInfo);
  //   setaccountInfo(accountInfo)
  // })
  // .catch((error) => {
  //   console.error('Failed to connect:', error);
  // });

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const balanceResponse = await fetch(`/api/wallet/balance?walletAddres=${wallet_connect.walletAddress}`);
        if (!balanceResponse.ok) throw new Error('Failed to fetch balance');
        const balanceData = await balanceResponse.json();
        setBalance(balanceData.balance);

        // Fetch transaction history
        const historyResponse = await fetch(`/api/wallet/history?walletAddress=${wallet_connect.walletAddress}`);
        if (!historyResponse.ok) throw new Error('Failed to fetch transaction history');
        const historyData = await historyResponse.json();
        console.log({historyData})
        setTransactions(historyData.transactions);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [wallet_connect.walletAddress]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {wallet_connect.name}</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
          <p className="text-3xl font-bold text-green-600">
            ${balance !== null ? balance.toFixed(2) : 'N/A'}
          </p>
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
        <TransactionHistory transactions={transactions} />
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

export default WalletContent;
