import { Router } from 'express';
import authController from '../../controllers/auth';

const router = Router();

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

export default router;
