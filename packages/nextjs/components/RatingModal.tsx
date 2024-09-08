import { useState, useEffect } from 'react';
import { Transaction } from '~~/app/lib/interfaces';
import axios from "axios";

interface RatingModalProps {
  userAddress: string;
  onClose: () => void;
  transactions: Transaction[];
}

interface Merchant {
  merchant_address: string;
  merchant_name: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ userAddress, onClose, transactions }) => {
  const [unratedMerchants, setUnratedMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const fetchUnratedMerchants = async () => {
      try {
        const unrated_merchants: Merchant[] = [];
        for (const transaction of transactions) {
          if (transaction.type === "sent" && transaction.to) {
            unrated_merchants.push({
              merchant_address: transaction.to,
              merchant_name: "Sandyagu R" // You might want to replace this with actual merchant names
            });
          }
        }
        setUnratedMerchants(unrated_merchants);
      } catch (error) {
        console.error('Error fetching unrated merchants:', error);
      }
    };

    fetchUnratedMerchants();
  }, [userAddress, transactions]);

  const handleSubmitRating = async () => {
    if (!selectedMerchant) return;

    try {
      const response = await axios.post('/api/ratings/attestation', { signerAddress:userAddress, description:comment, merchantaddress:selectedMerchant.merchant_address, rating:rating } );

      if (response.status !== 200) throw new Error('Failed to submit rating');

      // Remove the rated merchant from the list
      setUnratedMerchants(unratedMerchants.filter(m => m.merchant_address !== selectedMerchant.merchant_address));
      setSelectedMerchant(null);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('/api/xmtp/subscribe', {
        walletAddress:userAddress,
      });
  // console.log(response)
      if (response.status!== 200) throw new Error('Failed to subscribe');

      onClose();
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= 100) {
      setComment(input);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Rate Merchants</h2>
        {unratedMerchants.length > 0 ? (
          <>
            <select
              className="w-full p-2 mb-4 border rounded"
              value={selectedMerchant?.merchant_address || ''}
              onChange={(e) => setSelectedMerchant(unratedMerchants.find(m => m.merchant_address === e.target.value) || null)}
            >
              <option value="">Select a merchant</option>
              {unratedMerchants.map((merchant) => (
                <option key={merchant.merchant_address} value={merchant.merchant_address}>
                  {merchant.merchant_name}
                </option>
              ))}
            </select>
            {selectedMerchant && (
              <div className="mb-4">
                <p className="mb-2">Rate {selectedMerchant.merchant_name}:</p>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900">
                    Your comment (max 100 characters):
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={handleCommentChange}
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">{comment.length}/100 characters</p>
                </div>
              </div>
            )}
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
              onClick={handleSubmitRating}
              disabled={!selectedMerchant || rating === 0}
            >
              Submit Rating
            </button>
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
              onClick={handleSubscribe}
              disabled={!selectedMerchant || rating === 0}
            >
              Subscribe To Merchant
            </button>
          </>
        ) : (
          <p>No unrated merchants found.</p>
        )}
        <button
          className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
