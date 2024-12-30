import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const transactions = [
  { id: 1, type: 'credit', description: 'Salary Deposit', amount: 5000.00, date: '2024-02-28', category: 'Income' },
  { id: 2, type: 'debit', description: 'Amazon Purchase', amount: 129.99, date: '2024-02-27', category: 'Shopping' },
  { id: 3, type: 'credit', description: 'Freelance Payment', amount: 850.00, date: '2024-02-26', category: 'Income' },
  { id: 4, type: 'debit', description: 'Electricity Bill', amount: 124.50, date: '2024-02-25', category: 'Utilities' }
];

function TransactionList() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow p-4"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                {transaction.type === 'credit' ? (
                  <ArrowDownLeft className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                <p className="text-xs text-gray-500">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TransactionList;