'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function SendModal({ onClose }: { onClose: () => void }) {
  const [isOffline, setIsOffline] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOffline) {
      router.push('/offline-transaction-instructions');
    } else {
      // Handle online transaction
      console.log('Online transaction:', { walletAddress, amount });
      onClose();
    }
  };

  const handleScan = (data: { text: string } | null) => {
    if (data) {
      setWalletAddress(data.text);
      setShowScanner(false);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Send Funds</h2>
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isOffline}
                onChange={() => setIsOffline(!isOffline)}
              />
              <div className={`block w-14 h-8 rounded-full ${isOffline ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isOffline ? '' : 'transform translate-x-6'}`}></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">
              {isOffline ? 'Offline Payment' : 'Online Payment'}
            </div>
          </label>
        </div>
        {showScanner ? (
          <div className="mb-4">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
            <button
              onClick={() => setShowScanner(false)}
              className="mt-2 w-full bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel Scan
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {isOffline ? (
              <>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Wallet Address or Phone Number"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowScanner(true)}
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded mb-4"
                >
                  Scan QR Code
                </button>
              </>
            )}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                {isOffline ? 'Continue' : 'Send'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
