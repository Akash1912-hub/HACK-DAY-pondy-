import express from 'express';
import { createTransaction, getTransactionHistory } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/record', createTransaction);
router.get('/history', getTransactionHistory);

export default router;
