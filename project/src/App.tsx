import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CreateWallet } from '@/components/wallet/CreateWallet';
import { AssetList } from '@/components/wallet/AssetList';
import { ActivityList } from '@/components/wallet/ActivityList';
import { TransactionSection } from '@/components/TransactionSection';
import { initializeWeb3, getNodeInfo, createNewWallet, getWalletBalance, sendTransaction } from '@/lib/web3-utils';
import type Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkInfo, setNetworkInfo] = useState('Not Connected');
  const [account, setAccount] = useState<any>(null);
  const [balance, setBalance] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [seedPhrase, setSeedPhrase] = useState<string>();

  const connectToNetwork = async () => {
    try {
      const web3Instance = await initializeWeb3();
      const nodeInfo = await getNodeInfo(web3Instance);
      setWeb3(web3Instance);
      setIsConnected(true);
      setNetworkInfo(`Connected: ${nodeInfo}`);
    } catch (error: any) {
      setNetworkInfo(`Error: ${error.message}`);
      setIsConnected(false);
    }
  };

  const handleCreateWallet = async () => {
    if (!web3) return;
    try {
      const newAccount = await createNewWallet(web3);
      setAccount(newAccount);
      setSeedPhrase(newAccount.privateKey);
      await checkBalance(newAccount.address);
    } catch (error: any) {
      console.error('Error creating wallet:', error);
    }
  };

  const checkBalance = async (address?: string) => {
    if (!web3 || (!address && !account)) return;
    try {
      const walletBalance = await getWalletBalance(web3, address || account.address);
      setBalance(walletBalance);
    } catch (error: any) {
      console.error('Error checking balance:', error);
    }
  };

  const handleSendTransaction = async (recipient: string, amount: string) => {
    if (!web3 || !account) {
      setTransactionStatus('Please connect wallet first');
      return;
    }

    if (!recipient || !amount) {
      setTransactionStatus('Please enter recipient address and amount');
      return;
    }

    try {
      const receipt = await sendTransaction(web3, account, recipient, amount);
      setTransactionStatus(`Transaction Hash: ${receipt.transactionHash}`);
      await checkBalance();
    } catch (error: any) {
      setTransactionStatus(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected && account) {
        checkBalance();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isConnected, account]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        isConnected={isConnected}
        balance={balance}
        walletAddress={account?.address}
        onConnect={connectToNetwork}
      />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {!account ? (
          <CreateWallet onCreateWallet={handleCreateWallet} seedPhrase={seedPhrase} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <AssetList />
              <TransactionSection
                onSendTransaction={handleSendTransaction}
                transactionStatus={transactionStatus}
              />
            </div>
            <ActivityList />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;