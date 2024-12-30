import { motion } from 'framer-motion';
import { Shield, Banknote, Users, Landmark, HeadphonesIcon, Wallet, Coins, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { icon: Shield, label: 'Insurance', path: '/insurance', color: 'from-purple-500 to-indigo-500', delay: 0 },
  { icon: Banknote, label: 'Loan', path: '/loan', color: 'from-green-500 to-emerald-500', delay: 0.1 },
  { icon: Users, label: 'Transfer', path: '/transfer', color: 'from-orange-500 to-red-500', delay: 0.2 },
  { icon: Landmark, label: 'Payment', path: '/payment', color: 'from-blue-500 to-cyan-500', delay: 0.3 },
  { icon: HeadphonesIcon, label: 'Support', path: '/support', color: 'from-pink-500 to-rose-500', delay: 0.4 },
  { icon: Wallet, label: 'Cards', path: '/cards', color: 'from-yellow-500 to-amber-500', delay: 0.5 },
  { icon: Coins, label: 'Savings', path: '/savings', color: 'from-teal-500 to-green-500', delay: 0.6 },
  { icon: DollarSign, label: 'Investments', path: '/investments', color: 'from-violet-500 to-purple-500', delay: 0.7 }
];

function QuickAction({ icon: Icon, label, color, path, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={path} className="block">
        <div className="relative overflow-hidden bg-white rounded-lg shadow p-4 group">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          <Icon className="h-6 w-6 mb-2 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-sm font-medium text-gray-900">{label}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {actions.map((action, index) => (
        <QuickAction key={index} {...action} />
      ))}
    </div>
  );
}

export default QuickActions;