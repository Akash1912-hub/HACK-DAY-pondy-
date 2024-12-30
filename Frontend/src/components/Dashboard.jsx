import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Banknote, Users, Landmark, HeadphonesIcon, Wallet, Coins, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
    className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 overflow-hidden group"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
      initial={false}
    />
    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <Icon className="h-8 w-8 text-indigo-600" />
      </motion.div>
      <span className="text-sm font-medium text-gray-900">{title}</span>
    </div>
  </motion.div>
);

const TransactionItem = ({ amount, title, date, isDebit }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center space-x-4">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isDebit ? 'bg-red-100' : 'bg-green-100'
        }`}
      >
        {isDebit ? '↓' : '↑'}
      </motion.div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
    <span className={`font-medium ${isDebit ? 'text-red-600' : 'text-green-600'}`}>
      {isDebit ? '-' : '+'}${amount}
    </span>
  </motion.div>
);

function Dashboard() {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Shield, title: 'Insurance', delay: 0.1, link: '/insurance' },
    { icon: Banknote, title: 'Loan', delay: 0.2, link: '/loan' },
    { icon: Users, title: 'Peer', delay: 0.3, link: '/peer' },
    { icon: Landmark, title: 'Payment', delay: 0.4, link: '/payment' },
    { icon: HeadphonesIcon, title: 'Support', delay: 0.5, link: '/support' },
    { icon: Wallet, title: 'Wallet', delay: 0.6, link: '/wallet' },
    { icon: Coins, title: 'Transaction', delay: 0.7, link: '/transaction' },
    { icon: DollarSign, title: 'Balance', delay: 0.8, link: '/balance' },
  ];

  const verifyPin = () => {
    if (pin === '2006') {
      setShowBalance(true);
      setIsPinModalOpen(false);
    } else {
      alert('Incorrect PIN');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 w-screen flex flex-col"
    >
      <div className="w-screen mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 flex-grow">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 pr-100">Welcome back, Customer</h1>


            <p className="text-gray-600">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-indigo-600"
          >
            {currentTime.toLocaleTimeString()}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <FeatureCard {...feature} />
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl shadow-lg p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <TransactionItem
              amount="124.50"
              title="Grocery Shopping"
              date="Today"
              isDebit={true}
            />
            <TransactionItem
              amount="1,200.00"
              title="Salary Deposit"
              date="Yesterday"
              isDebit={false}
            />
            <TransactionItem
              amount="45.00"
              title="Coffee Shop"
              date="2 days ago"
              isDebit={true}
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Bills</h2>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-100"
              >
                <div>
                  <p className="font-medium">Electricity Bill</p>
                  <p className="text-sm text-gray-500">Due in 5 days</p>
                </div>
                <span className="font-medium text-red-600">$124.50</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100"
              >
                <div>
                  <p className="font-medium">Internet Bill</p>
                  <p className="text-sm text-gray-500">Due in 12 days</p>
                </div>
                <span className="font-medium text-yellow-600">$79.99</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isPinModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter PIN</h2>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
              />
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium"
                  onClick={() => setIsPinModalOpen(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                  onClick={verifyPin}
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Dashboard;
