import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { TransactionDetails } from './components/TransactionDetails';
import { getTransaction } from './services/web3';
import { Blocks } from 'lucide-react';
import type { Transaction } from './types/transaction';

function App() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (hash: string) => {
    try {
      setLoading(true);
      setError('');
      const tx = await getTransaction(hash);
      setTransaction(tx);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction not found or network error occurred';
      setError(errorMessage);
      setTransaction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Blocks className="text-blue-500 mr-2" size={32} />
          <h1 className="text-3xl font-bold">Block Explorer</h1>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-100 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {transaction && <TransactionDetails transaction={transaction} />}

        {!transaction && !loading && !error && (
          <div className="text-center text-gray-500 mt-8">
            Enter a transaction hash to see its details
          </div>
        )}
      </div>
    </div>
  );
}

export default App;