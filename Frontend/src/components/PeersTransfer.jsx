import React from 'react';
import TransactionForm from './TransactionForm';
import RecentContacts from '../components/RecentContact';
import TransactionHistory from '../components/TransactionHistory';

function PeersTransfer() {
  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TransactionForm />
          <RecentContacts />
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
}

export default PeersTransfer;
