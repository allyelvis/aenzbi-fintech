"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController_1 = require("../controllers/accountController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.auth, accountController_1.createAccount);
router.get('/', auth_1.auth, accountController_1.getAccounts);
router.get('/:id/balance', auth_1.auth, accountController_1.getAccountBalance);
exports.default = router;
