import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

function BalanceCard() {
  return (
    <div className="bg-white w-screen rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Current Balance</h2>
        <DollarSign className="h-6 w-6 text-indigo-600" />
      </div>
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">$24,562.80</span>
      </div>
      <div className="flex items-center m-5 text-green-600">
        <TrendingUp className="h-4 w-4 mr-1" />
        <span className="text-sm">+2.3% from last month</span>
      </div>
      <Link to='/dashboard' className='p-2 text-white'><button>Back</button></Link>
    </div>
    
  );
}

export default BalanceCard;