import { useState, useEffect } from 'react';

interface LoanModalProps {
  walletAddress: string;
  onClose: () => void;
}

const LoanModal: React.FC<LoanModalProps> = ({ walletAddress, onClose }) => {
  const [availableCredit, setAvailableCredit] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');

  useEffect(() => {
    const fetchAvailableCredit = async () => {
      try {
        const response = await fetch(`/api/loan/availableCredit/${walletAddress}`);
        if (!response.ok) throw new Error('Failed to fetch available credit');
        const data = await response.json();
        setAvailableCredit((data.credit));
      } catch (error) {
        console.error('Error fetching available credit:', error);
      }
    };

    fetchAvailableCredit();
  }, [walletAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement loan request logic here
    console.log('Loan requested:', { loanAmount, tenure });
    
    // Close the modal after submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Get a Loan</h2>
        <p className="mb-4">Available Credit: ${availableCredit}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block mb-2">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tenure" className="block mb-2">Tenure (months)</label>
            <input
              type="number"
              id="tenure"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Get Loan
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoanModal;
