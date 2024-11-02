import express from 'express';
import { getInvestmentOptions, createInvestment, getInvestments, sellInvestment } from '../controllers/investmentController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/options', auth, getInvestmentOptions);
router.post('/', auth, createInvestment);
router.get('/', auth, getInvestments);
router.post('/:id/sell', auth, sellInvestment);

export default router;
