"use client";

import { Suspense, useEffect, useState } from "react";
import ReceiveModal from "./ReceiveModal";
import SendModal from "./SendModal";
import TransactionHistory from "./TransactionHistory";
import Loading from "./loading_content";
import { user_props } from "~~/app/lib/interfaces";
import { Transaction } from "~~/app/lib/interfaces";

interface WalletContentProps {
  wallet_connect: user_props;
}

function WalletContentInner({ wallet_connect }: WalletContentProps) {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const balanceResponse = await fetch(`/api/wallet/balance/${wallet_connect.walletAddress}`);
        if (!balanceResponse.ok) throw new Error("Failed to fetch balance");
        const balanceData = await balanceResponse.json();
        setBalance(balanceData.balance);

        const historyResponse = await fetch(`/api/wallet/history?walletAddress=${wallet_connect.walletAddress}`);
        if (!historyResponse.ok) throw new Error("Failed to fetch transaction history");
        const historyData = await historyResponse.json();
        console.log({ historyData });
        setTransactions(historyData.transactions);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [wallet_connect.walletAddress]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {wallet_connect.name}</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
          <p className="text-3xl font-bold text-green-600">${balance !== null ? balance.toFixed(2) : "00.00"}</p>
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
      {isSendModalOpen && <SendModal onClose={() => setIsSendModalOpen(false)} />}
      {isReceiveModalOpen && (
        <ReceiveModal walletAddress={wallet_connect.walletAddress} onClose={() => setIsReceiveModalOpen(false)} />
      )}
    </div>
  );
}

const WalletContent: React.FC<WalletContentProps> = ({ wallet_connect }) => {
  return (
    <Suspense fallback={<Loading />}>
      <WalletContentInner wallet_connect={wallet_connect} />
    </Suspense>
  );
};

export default WalletContent;
