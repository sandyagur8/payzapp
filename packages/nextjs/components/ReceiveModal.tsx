'use client'

// import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ReceiveModalProps {
  onClose: () => void;
  walletAddress: string;
}

export default function ReceiveModal({ onClose, walletAddress }: ReceiveModalProps) {
  // const [amount, setAmount] = useState('');

  // const qrData = amount ? `${walletAddress}?amount=${amount}` : walletAddress;
  const qrData = walletAddress

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Receive Funds</h2>
        <div className="mb-4">
          <div className="flex justify-center mb-4">
            <QRCodeSVG value={qrData} size={200} />
          </div>
          <p className="text-center text-sm mb-2">Scan this QR code to receive funds</p>
          <p className="text-center text-xs text-gray-500 break-all">{qrData}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}