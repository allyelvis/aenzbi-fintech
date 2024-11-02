import { Request, Response } from 'express';
import Account from '../models/Account';

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { currency } = req.body;
    const accountNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    
    const account = new Account({
      userId: (req as any).user.userId,
      accountNumber,
      currency
    });

    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find({ userId: (req as any).user.userId });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAccountBalance = async (req: Request, res: Response) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, userId: (req as any).user.userId });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json({ balance: account.balance, currency: account.currency });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
