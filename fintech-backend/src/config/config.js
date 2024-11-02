"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fintech';
