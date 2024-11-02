"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    accountNumber: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Account', accountSchema);