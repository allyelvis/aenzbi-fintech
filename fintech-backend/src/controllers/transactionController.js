"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.createTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Account_1 = __importDefault(require("../models/Account"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { fromAccountId, toAccountId, amount, currency } = req.body;
        const fromAccount = yield Account_1.default.findOne({ _id: fromAccountId, userId: req.user.userId }).session(session);
        const toAccount = yield Account_1.default.findById(toAccountId).session(session);
        if (!fromAccount || !toAccount) {
            yield session.abortTransaction();
            return res.status(404).json({ error: 'Account not found' });
        }
        if (fromAccount.balance < amount) {
            yield session.abortTransaction();
            return res.status(400).json({ error: 'Insufficient funds' });
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        yield fromAccount.save();
        yield toAccount.save();
        const transaction = new Transaction_1.default({
            fromAccount: fromAccountId,
            toAccount: toAccountId,
            amount,
            currency,
            status: 'completed'
        });
        yield transaction.save();
        yield session.commitTransaction();
        res.status(201).json(transaction);
    }
    catch (err) {
        yield session.abortTransaction();
        res.status(500).json({ error: 'Server error' });
    }
    finally {
        session.endSession();
    }
});
exports.createTransaction = createTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield Account_1.default.find({ userId: req.user.userId });
        const accountIds = accounts.map(account => account._id);
        const transactions = yield Transaction_1.default.find({});
    }
    finally {
    }
});
exports.getTransactions = getTransactions;
[
    { fromAccount: { accountIds } },
    { toAccount: { accountIds } }
];
sort({ createdAt: -1 });
res.json(transactions);
try { }
catch (err) {
    res.status(500).json({ error: 'Server error' });
}
;
