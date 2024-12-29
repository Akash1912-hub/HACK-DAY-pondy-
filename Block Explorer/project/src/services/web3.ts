import Web3 from 'web3';
import type { Transaction, TransactionError } from '../types/transaction';

// Use HTTP instead of HTTPS for local blockchain
const web3 = new Web3('http://127.0.0.1:8545');

export const getTransaction = async (hash: string): Promise<Transaction> => {
  try {
    // Validate hash format
    if (!web3.utils.isHexStrict(hash)) {
      throw new Error('Invalid transaction hash format');
    }

    const tx = await web3.eth.getTransaction(hash);
    if (!tx) {
      throw new Error('Transaction not found');
    }

    const receipt = await web3.eth.getTransactionReceipt(hash);
    if (!receipt) {
      throw new Error('Transaction receipt not found');
    }

    const block = await web3.eth.getBlock(tx.blockNumber!);
    if (!block) {
      throw new Error('Block not found');
    }

    return {
      hash: tx.hash,
      blockNumber: Number(tx.blockNumber),
      from: tx.from,
      to: tx.to || '',
      value: tx.value.toString(),
      gasUsed: receipt.gasUsed.toString(),
      status: receipt.status === BigInt(1),
      timestamp: Number(block.timestamp)
    };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    const web3Error = error as TransactionError;
    if (web3Error.code === -32603) {
      throw new Error('Cannot connect to blockchain node. Please ensure it is running.');
    }
    throw error;
  }
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatValue = (value: string): string => {
  try {
    return web3.utils.fromWei(value, 'ether');
  } catch {
    return '0';
  }
};