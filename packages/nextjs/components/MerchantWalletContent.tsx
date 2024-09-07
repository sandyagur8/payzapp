"use client";

import { useEffect, useState } from "react";
import SendModal from "./SendModal";
import TransactionHistory from "./TransactionHistory";
import Loading from "./loading_content";
import axios from "axios";
import { title } from "process";
import { QRCodeSVG } from "qrcode.react";
import { Transaction, user_props } from "~~/app/lib/interfaces";

interface WalletContentProps {
  wallet_connect: user_props;
}

const MerchantWalletContent: React.FC<WalletContentProps> = ({ wallet_connect }) => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isXmtpAlertsOpen, setIsXmtpAlertsOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null); // Example balance
  const walletAddress = wallet_connect.walletAddress; // Replace with actual wallet address
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewRatings, setViewRatings] = useState<boolean>(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true);
      try {
        const balanceResponse = await axios.get(`/api/wallet/balance2/${wallet_connect.walletAddress}`);
        if (balanceResponse.status != 200) throw new Error("Failed to fetch balance");
        const balanceData = await balanceResponse.data;
        setBalance(balanceData.balance);

        const historyResponse = await axios.get(`/api/wallet/history?walletAddress=${wallet_connect.walletAddress}`);
        if (historyResponse.status != 200) throw new Error("Failed to fetch transaction history");
        const historyData = historyResponse.data;
        console.log({ historyData });
        setTransactions(historyData);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setIsLoading(false);
        console.log("done");
      }
    };

    fetchWalletData();
  }, [wallet_connect.walletAddress]);

  return !isLoading ? (
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
          <button
            onClick={() => setIsXmtpAlertsOpen(true)}
            className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Push Promotion
          </button>
          <button
            onClick={() => setViewRatings(true)}
            className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Show my ratings
          </button>
        </div>

        <TransactionHistory transactions={transactions} />
      </main>

      {isSendModalOpen && <SendModal onClose={() => setIsSendModalOpen(false)} />}

      {isXmtpAlertsOpen && <XmtpAlertsModal address={walletAddress} onClose={() => setIsXmtpAlertsOpen(false)} />}

      { viewRatings && <RatingsModal address={walletAddress} onClose={() => setViewRatings(false)} />}

    </div>
  ) : (
    <>
      <Loading />
    </>
  );
};

interface review {
  id:number;
  review: string;
  signer: string;
  rating: number;
}



function RatingsModal({ onClose, address }: { onClose: () => void; address: string }) {
  const [reviews, setreviews] = useState<review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/ratings/attestation?address=${address}`);
        console.log(response);
        setreviews(response.data.reviews);
      } catch (err) {
        setError("Failed to fetch alerts");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setError(null);
        }, 3000);
      }
    };

    fetchAlerts();
  }, [address]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Ratings</h2>
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="mb-4 p-6 bg-white rounded-lg shadow-md">
              <div className="mb-2">
                <span className="text-lg font-bold text-indigo-600">User:</span>
                <span className="ml-2 text-gray-800">{review.signer}</span>
              </div>
              <div className="mb-2">
                <span className="text-lg font-bold text-indigo-600">Rating:</span>
                <span className="ml-2 text-yellow-400">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className="text-2xl">★</span>
                  ))}
                </span>
              </div>
              <div>
                <span className="text-lg font-bold text-indigo-600">Review:</span>
                <p className="mt-2 text-gray-700">{review.review}</p>
              </div>
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

function XmtpAlertsModal({ onClose, address }: { onClose: () => void; address: string }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const[title,setTitle]= useState("")

  const handleSubmit = async () => {
    if (message.length > 100) {
      setError("Message must be under 100 characters");
    } else if (message.trim() === "") {
      setError("Message cannot be empty");
    } else {
      const resp = await axios.post("/api/xmtp/push", {
        method: "POST",
        body: {
          address: address,
          message: message,
          title:title
        },
      });
      if (resp.status == 200) {
        await axios.get("/api/xmtp/broadcast");
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">XMTP Message</h2>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Enter your message (max 100 characters):
          </label>
          <textarea
            id="message"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={3}
            value={message}
            onChange={e => {
              setMessage(e.target.value);
              setError("");
            }}
          />
            <textarea
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={3}
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setError("");
            }}
          />
          <p className="mt-2 text-sm text-gray-500">{message.length}/100 characters</p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default MerchantWalletContent;
