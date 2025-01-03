import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import transactionRoutes from './routes/transaction.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/payment', transactionRoutes);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
