"use client";

import { useEffect, useState } from "react";
import SendModal from "./SendModal";
import TransactionHistory from "./TransactionHistory";
import { QRCodeSVG } from "qrcode.react";
import { Transaction, user_props } from "~~/app/lib/interfaces";
import { title } from "process";
import Loading from "./loading_content";
interface WalletContentProps {
  wallet_connect: user_props ;
}

const MerchantWalletContent: React.FC<WalletContentProps> = ({ wallet_connect }) => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isXmtpAlertsOpen, setIsXmtpAlertsOpen] = useState(false);
  const [balance, setBalance] = useState<number|null>(null); // Example balance
  const walletAddress = wallet_connect.walletAddress; // Replace with actual wallet address
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading,setIsLoading]=useState<boolean>(true)

  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true);
      try {
        const balanceResponse = await fetch(`/api/wallet/balance2/${wallet_connect.walletAddress}`);
        if (!balanceResponse.ok) throw new Error("Failed to fetch balance");
        const balanceData = await balanceResponse.json();
        setBalance(balanceData.balance);

        const historyResponse = await fetch(`/api/wallet/history?walletAddress=${wallet_connect.walletAddress}`);
        if (!historyResponse.ok) throw new Error("Failed to fetch transaction history");
        const historyData = await historyResponse.json();
        console.log({ historyData });
        setTransactions(historyData);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setIsLoading(false)
        console.log("done");
      }
    };

    fetchWalletData();
  }, [wallet_connect.walletAddress]);

  return !isLoading ?(
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
          <p className="text-3xl font-bold text-green-600">${balance}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Receive Payments</h2>
          <div className="flex justify-center mb-4">
            <QRCodeSVG value={walletAddress} size={200} />
          </div>
          <p className="text-center text-sm mb-2">Scan this QR code to receive payments</p>
          <p className="text-center text-xs text-gray-500 break-all">{walletAddress}</p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setIsSendModalOpen(true)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
          <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Push Promotion</button>
        </div>

        <TransactionHistory transactions={transactions} />

        <div className="flex space-x-4 mt-6">
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Link with HW
          </button>
          <button
            onClick={() => setIsXmtpAlertsOpen(true)}
            className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            XMTP Alerts
          </button>
        </div>
      </main>

      {isSendModalOpen && <SendModal onClose={() => setIsSendModalOpen(false)} />}

      {isXmtpAlertsOpen && <XmtpAlertsModal onClose={() => setIsXmtpAlertsOpen(false)} />}
    </div>
  ):(
    <>
      <Loading/>
    </>
  );
};

function XmtpAlertsModal({ onClose }: { onClose: () => void }) {
  const alerts = [
    {
      id: 1,
      title: "New Event: Blockchain Conference",
      description: "Join us for the annual blockchain conference in your area!",
    },
    {
      id: 2,
      title: "Special Offer: 20% off on crypto purchases",
      description: "Limited time offer for all merchant wallet users.",
    },
    {
      id: 3,
      title: "Security Update",
      description: "Important security update for your merchant wallet. Please update your app.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">XMTP Alerts</h2>
        <div className="max-h-80 overflow-y-auto">
          {alerts.map(alert => (
            <div key={alert.id} className="mb-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold">{alert.title}</h3>
              <p className="text-sm text-gray-600">{alert.description}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Close
        </button>
      </div>
    </div>
  );
}

export default MerchantWalletContent;
