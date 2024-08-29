import { Transaction } from "~~/app/lib/interfaces";

interface TransactionHistoryProps {
  transactions: Transaction[]; 
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border-b py-2 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-600">
                    {transaction.type === 'sent' ? `To: ${transaction.to}` : `From: ${transaction.from}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`}>
                    ${transaction.amount}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.created_at}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No transactions to display.</p>
      )}
    </div>
  );
};

export default TransactionHistory;
