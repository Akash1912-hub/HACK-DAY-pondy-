import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { formatAddress, formatValue } from '../services/web3';
import type { Transaction } from '../types/transaction';

interface TransactionDetailsProps {
  transaction: Transaction;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  if (!transaction) return null;

  const timestamp = Number(transaction.timestamp) * 1000;
  const timeAgo = formatDistance(timestamp, new Date(), { addSuffix: true });

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-6">Transaction Details</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-gray-400">Transaction Hash:</p>
            <p className="text-gray-100 break-all">{transaction.hash}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-gray-400">Status:</p>
            <div className="flex items-center">
              {transaction.status ? (
                <>
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  <span className="text-green-500">Success</span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500 mr-2" size={18} />
                  <span className="text-red-500">Failed</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400">Block:</p>
            <p className="text-gray-100">{transaction.blockNumber}</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400">Timestamp:</p>
            <p className="text-gray-100">{timeAgo}</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400">From:</p>
            <p className="text-gray-100">{formatAddress(transaction.from)}</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400">To:</p>
            <p className="text-gray-100">{formatAddress(transaction.to)}</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400">Value:</p>
            <p className="text-gray-100">{formatValue(transaction.value)} ETH</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400">Gas Used:</p>
            <p className="text-gray-100">{transaction.gasUsed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};