import express from 'express';
import { createAccount, getAccounts, getAccountBalance, closeAccount } from '../controllers/accountController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createAccount);
router.get('/', auth, getAccounts);
router.get('/:id/balance', auth, getAccountBalance);
router.post('/:id/close', auth, closeAccount);

export default router;
