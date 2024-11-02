import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Account', accountSchema);