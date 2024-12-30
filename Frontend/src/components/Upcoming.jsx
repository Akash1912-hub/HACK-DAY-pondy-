import { motion } from 'framer-motion';
import { Calendar, AlertCircle } from 'lucide-react';

const bills = [
  { id: 1, name: 'Electricity Bill', dueIn: 5, amount: 124.50, status: 'pending' },
  { id: 2, name: 'Internet Bill', dueIn: 12, amount: 79.99, status: 'pending' },
  { id: 3, name: 'Water Bill', dueIn: 3, amount: 45.00, status: 'overdue' }
];

function UpcomingBills() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Upcoming Bills</h2>
        <Calendar className="h-4 w-4 text-gray-500" />
      </div>
      <div className="space-y-3">
        {bills.map((bill) => (
          <motion.div
            key={bill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="group flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              {bill.status === 'overdue' && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <div>
                <p className="font-medium text-gray-900 text-sm">{bill.name}</p>
                <p className={`text-xs ${bill.status === 'overdue' ? 'text-red-500' : 'text-gray-500'}`}>
                  {bill.status === 'overdue' ? 'Overdue' : `Due in ${bill.dueIn} days`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-red-600 text-sm">${bill.amount.toFixed(2)}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Pay Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default UpcomingBills;