"use client";

import { Suspense, useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import SendModal from "./SendModal";
import RatingModal from "./RatingModal";
import LoanModal from "./LoanModal";
import TransactionHistory from "./TransactionHistory";
import LoanTab from "./LoanTab";
import Loading from "./loading_content";
import { user_props } from "~~/app/lib/interfaces";
import { Transaction } from "~~/app/lib/interfaces";
import axios from "axios"
interface WalletContentProps {
  wallet_connect: user_props;
}

interface alerts{
  id: number,
  title: string,
  content:string
}
function WalletContentInner({ wallet_connect }: WalletContentProps) {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'transactions' | 'loans'>('transactions');
  const [isXmtpAlertsOpen, setIsXmtpAlertsOpen] = useState(false);
  
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const balanceResponse = await axios.get(`/api/wallet/balance2/${wallet_connect.walletAddress}`);
        if (balanceResponse.status!=200) throw new Error("Failed to fetch balance");
        const balanceData = await balanceResponse.data;
        console.log({balanceData})
        setBalance(balanceData.balance);

        const historyResponse = await axios.get(`/api/wallet/history?walletAddress=${wallet_connect.walletAddress}`);
        if (historyResponse.status!=200) throw new Error("Failed to fetch transaction history");
        const historyData = await historyResponse.data;
        console.log(historyData)
        setTransactions(historyData as Transaction[]);
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
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
            <p className="text-3xl font-bold text-green-600">
              ${balance !== null ? Number(balance).toFixed(2) : "00.00"}
            </p>
          </div>
          <div className="text-center">
            {/* <h2 className="text-xl font-semibold mb-2">Receive Payments</h2> */}
            <QRCodeSVG value={wallet_connect.walletAddress} size={100} />
            <p className="text-xs text-gray-500 mt-2 break-all max-w-[150px] pr-10 ">
              {wallet_connect.walletAddress}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setIsSendModalOpen(true)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Funds
          </button>
          <button
            onClick={() => setIsRatingModalOpen(true)}
            className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Give Rating
          </button>
          <button
            onClick={() => setIsLoanModalOpen(true)}
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Get Loan
          </button>
          <button
            onClick={() => setIsXmtpAlertsOpen(true)}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Offer Zone
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`mr-4 ${activeTab === 'transactions' ? 'font-bold' : ''}`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('loans')}
            className={activeTab === 'loans' ? 'font-bold' : ''}
          >
            Loans
          </button>
        </div>
        {activeTab === 'transactions' ? (
          <TransactionHistory transactions={transactions} />
        ) : (
          <LoanTab walletAddress={wallet_connect.walletAddress} />
        )}
      </main>
      {isSendModalOpen && <SendModal onClose={() => setIsSendModalOpen(false)} />}
      {isRatingModalOpen && (
        <RatingModal transactions={transactions} userAddress={wallet_connect.walletAddress} onClose={() => setIsRatingModalOpen(false)} />
      )}
      {isLoanModalOpen && (
        <LoanModal walletAddress={wallet_connect.walletAddress} onClose={() => setIsLoanModalOpen(false)} />
      )}
      {isXmtpAlertsOpen && <XmtpAlertsModal address={wallet_connect.walletAddress} onClose={() => setIsXmtpAlertsOpen(false)} />}
    </div>
  );
}

function XmtpAlertsModal({ onClose, address }: { onClose: () => void; address: string }) {
  const [alerts, setAlerts] = useState<alerts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/xmtp/get?walletAddress=${address}`);
        console.log(response)
        setAlerts(response.data.data);
      } catch (err) {
        setError('Failed to fetch alerts');
      } finally {
        setTimeout(()=>{
          setIsLoading(false);
          setError(null);
        },5000)
      }
    };

    fetchAlerts();
  }, [address]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Offer Zone</h2>
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : alerts.length > 0 ? (
            alerts.map(alert => (
              <div key={alert.id} className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold">New offer </h3>
                <p className="text-sm text-gray-600">{alert.content}</p>
              </div>
            ))
          ) : (
            <div>No alerts available</div>
          )}
        </div>
        <button onClick={onClose} className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Close
        </button>
      </div>
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
