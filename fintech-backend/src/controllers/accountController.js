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
exports.getAccountBalance = exports.getAccounts = exports.createAccount = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currency } = req.body;
        const accountNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
        const account = new Account_1.default({
            userId: req.user.userId,
            accountNumber,
            currency
        });
        yield account.save();
        res.status(201).json(account);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createAccount = createAccount;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield Account_1.default.find({ userId: req.user.userId });
        res.json(accounts);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getAccounts = getAccounts;
const getAccountBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield Account_1.default.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json({ balance: account.balance, currency: account.currency });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getAccountBalance = getAccountBalance;
