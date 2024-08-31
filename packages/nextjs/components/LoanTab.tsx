import { useState, useEffect } from 'react';
import { Loan as Loan } from '~~/app/lib/utils';
interface LoanTabProps {
  walletAddress: string;
}



const LoanTab: React.FC<LoanTabProps> = ({ walletAddress }) => {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`/api/loan/existingLoans/${walletAddress}/0`); //loan id hardcoded as 0
        if (!response.ok) throw new Error('Failed to fetch loans');
        const data = await response.json();
        setLoans(data.loans);
      } catch (error) {
        setLoans([])
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, [walletAddress]);

  const handleRepay = async (loanId: string) => {
    // Implement loan repayment logic here
    console.log('Repaying loan:', loanId);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
      {loans.length > 0 ? (
        <ul>
          {loans.map((loan) => (
            <li key={loan.id} className="border-b py-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Loan Amount: ${loan.amount.toFixed(2)}</span>
                <button
                  onClick={() => handleRepay(loan.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Repay
                </button>
              </div>
              <p>Remaining Amount: ${loan.remainingAmount.toFixed(2)}</p>
              <p>Next Tenure Date: {new Date(loan.nextTenureDate).toLocaleDateString()}</p>
              <p>Remaining Tenures: {loan.remainingTenures}</p>
              <p>Tenure Amount: ${loan.tenureAmount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active loans.</p>
      )}
    </div>
  );
};

export default LoanTab;
