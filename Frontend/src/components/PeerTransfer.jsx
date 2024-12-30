import React from 'react';
import { Users, Search, Clock, ArrowRight } from 'lucide-react';

function PeerTransfer() {
  const recentContacts = [
    { name: 'Jane Smith', email: 'jane.smith@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { name: 'John Doe', email: 'john.doe@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { name: 'Sarah Johnson', email: 'sarah.j@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  ];

  // Handler for the Send Money button
  const handleSendMoneyClick = () => {
    // Redirect to the specified URL
    window.location.href = 'http://localhost:5174/';
  };

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transfer Money</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Recipient</label>
                <div className="mt-1 relative">
                  <input
                    id="recipient-input" // Add ID
                    type="text"
                    placeholder="Email or phone number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="mt-1 relative">
                  <input
                    id="amount-input" // Add ID
                    type="number"
                    placeholder="0.00"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">USD</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Note (optional)</label>
                <input
                  id="description-input" // Add ID
                  type="text"
                  placeholder="What's this for?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <button
                id="send-money-button" // Add ID
                type="button"
                onClick={handleSendMoneyClick}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Send Money
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeerTransfer;
