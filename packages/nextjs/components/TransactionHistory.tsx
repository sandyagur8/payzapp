export default function TransactionHistory() {
    const transactions = [
      { id: 1, type: 'Sent', amount: 50, to: 'Alice', date: '2023-05-01' },
      { id: 2, type: 'Received', amount: 100, from: 'Bob', date: '2023-04-28' },
      { id: 3, type: 'Sent', amount: 25, to: 'Charlie', date: '2023-04-25' },
    ];
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border-b py-2 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-600">
                    {transaction.type === 'Sent' ? `To: ${transaction.to}` : `From: ${transaction.from}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.type === 'Sent' ? 'text-red-600' : 'text-green-600'}`}>
                    ${transaction.amount}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  