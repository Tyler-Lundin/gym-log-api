// this is tough to do alone, hopefully it all pays off.


import { Router } from 'express';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import authRouter from './auth';
import dayRouter from './day';
import exerciseRouter from './exercise';

const router = Router();

router.use('/auth', authRouter);
router.use('/exercise', verifyAuthToken, exerciseRouter);
router.use('/day', verifyAuthToken, dayRouter);
//router.use('/week', verifyAuthToken, weekRouter);
//router.use('/month', verifyAuthToken, monthRouter);
//router.use('/year', verifyAuthToken, yearRouter);

export default router;
