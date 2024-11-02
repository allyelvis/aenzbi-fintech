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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const config_1 = require("../config/config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName } = req.body;
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
        user = new User_1.default({ email, password, firstName, lastName });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.login = login;
