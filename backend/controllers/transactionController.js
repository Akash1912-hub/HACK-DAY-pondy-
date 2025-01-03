import Transaction from '../models/Transaction.js';
import { sendTransaction } from '../utils/blockchain.js';

export const createTransaction = async (req, res) => {
  const { sender, receiver, amount, note } = req.body;

  try {
    
    const blockchainResponse = await sendTransaction(sender, receiver, amount);

    if (!blockchainResponse.success) {
      return res.status(400).json({ message: 'Blockchain transaction failed' });
    }

    
    const transaction = new Transaction({ sender, receiver, amount, note });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
