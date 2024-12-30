import React from 'react';
import { ArrowRight } from 'lucide-react';

const recentContacts = [
  { name: 'Jane Smith', wallet: '0x1234567890abcdef', avatar: 'https://via.placeholder.com/50' },
  { name: 'John Doe', wallet: '0xabcdef1234567890', avatar: 'https://via.placeholder.com/50' },
];

function RecentContacts() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Contacts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recentContacts.map((contact, index) => (
          <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <img src={contact.avatar} alt={contact.name} className="h-10 w-10 rounded-full" />
            <div className="ml-3">
              <p className="font-medium text-gray-900">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.wallet}</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentContacts;
