import React from 'react';
import { CreditCard, Receipt, Send, FileText, Link } from 'lucide-react';

function Payments() {
  const paymentOptions = [
    { icon: CreditCard, label: 'Pay Bills', description: 'Pay your utility bills, rent, and more',Link:'/peer' },
    { icon: Send, label: 'Send Money', description: 'Transfer money to friends and family' },
    { icon: Receipt, label: 'Mobile Recharge', description: 'Recharge your mobile phone' },
    { icon: FileText, label: 'Scheduled Payments', description: 'View and manage scheduled payments' },
  ];

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paymentOptions.map((option, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center mb-4">
              <option.icon className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">{option.label}</h3>
            </div>
            <p className="text-gray-500">{option.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Payments</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center">
              <Receipt className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium">Electricity Bill</p>
                <p className="text-sm text-gray-500">Mar 15, 2024</p>
              </div>
            </div>
            <span className="font-medium text-red-600">-$124.50</span>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center">
              <Send className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-gray-500">Mar 14, 2024</p>
              </div>
            </div>
            <span className="font-medium text-red-600">-$50.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;