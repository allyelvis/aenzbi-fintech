import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Account from '../models/Account';
import mongoose from 'mongoose';

export const createTransaction = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { fromAccountId, toAccountId, amount, currency } = req.body;

    const fromAccount = await Account.findOne({ _id: fromAccountId, userId: (req as any).user.userId }).session(session);
    const toAccount = await Account.findById(toAccountId).session(session);

    if (!fromAccount || !toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ error: 'Account not found' });
    }

    if (fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save();
    await toAccount.save();

    const transaction = new Transaction({
      fromAccount: fromAccountId,
      toAccount: toAccountId,
      amount,
      currency,
      status: 'completed'
    });

    await transaction.save();

    await session.commitTransaction();
    res.status(201).json(transaction);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: 'Server error' });
  } finally {
    session.endSession();
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find({ userId: (req as any).user.userId });
    const accountIds = accounts.map(account => account._id);

    const transactions = await Transaction.find({
      : [
        { fromAccount: { : accountIds } },
        { toAccount: { : accountIds } }
      ]
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
