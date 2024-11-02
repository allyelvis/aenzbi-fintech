import express from 'express';
import { createTransaction, getTransactions, getTransactionDetails } from '../controllers/transactionController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createTransaction);
router.get('/', auth, getTransactions);
router.get('/:id', auth, getTransactionDetails);

export default router;
