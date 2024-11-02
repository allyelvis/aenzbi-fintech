import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findByIdAndUpdate(
      (req as any).user.userId,
      { firstName, lastName },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
