"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.auth, transactionController_1.createTransaction);
router.get('/', auth_1.auth, transactionController_1.getTransactions);
exports.default = router;
