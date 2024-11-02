"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    fromAccount: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Account', required: true },
    toAccount: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Account', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Transaction', transactionSchema);
