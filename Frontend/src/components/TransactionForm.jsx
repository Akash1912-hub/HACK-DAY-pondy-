import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm() {
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    amount: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/payment/record', formData);
      alert('Transaction Successful!');
      console.log(response.data);
    } catch (error) {
      alert('Transaction Failed!');
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Transfer Money</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sender Wallet Address</label>
          <input
            type="text"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Sender Wallet Address"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Receiver Wallet Address</label>
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Receiver Wallet Address"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Amount in ETH"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Transaction Note"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Send Money
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
