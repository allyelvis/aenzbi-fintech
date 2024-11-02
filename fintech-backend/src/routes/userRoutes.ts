import express from 'express';
import { getUser, updateUser, changePassword } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/me', auth, getUser);
router.put('/me', auth, updateUser);
router.post('/change-password', auth, changePassword);

export default router;
