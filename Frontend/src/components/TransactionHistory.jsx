import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payment/history');
        setTransactions(response.data);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">To: {transaction.receiver}</span>
              <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${transaction.amount}`}
              </span>
            </div>
            <p className="text-sm text-gray-500">{transaction.note || 'No note'}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(transaction.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
