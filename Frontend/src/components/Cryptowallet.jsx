import React from 'react';
import { Bitcoin, ArrowUpRight, ArrowDownRight, Repeat } from 'lucide-react';

function CryptoWallet() {
  const cryptoAssets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '0.5234', value: '25,678.90', change: '+5.2%' },
    { name: 'Ethereum', symbol: 'ETH', balance: '2.3456', value: '4,567.80', change: '-2.1%' },
    { name: 'Cardano', symbol: 'ADA', balance: '1500.00', value: '750.00', change: '+1.8%' },
  ];

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Crypto Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cryptoAssets.map((asset, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Bitcoin className="h-8 w-8 text-indigo-600" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.symbol}</p>
                </div>
              </div>
              <span className={`text-sm ${asset.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {asset.change}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-2xl font-bold">${asset.value}</p>
              <p className="text-sm text-gray-500">{asset.balance} {asset.symbol}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Trade Crypto</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Cryptocurrency</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>Bitcoin (BTC)</option>
                <option>Ethereum (ETH)</option>
                <option>Cardano (ADA)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                Buy
              </button>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                Sell
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <ArrowUpRight className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Bought Bitcoin</p>
                  <p className="text-sm text-gray-500">Mar 15, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+0.0234 BTC</p>
                <p className="text-sm text-gray-500">$1,234.56</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <ArrowDownRight className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <p className="font-medium">Sold Ethereum</p>
                  <p className="text-sm text-gray-500">Mar 14, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">-1.5000 ETH</p>
                <p className="text-sm text-gray-500">$3,456.78</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoWallet;