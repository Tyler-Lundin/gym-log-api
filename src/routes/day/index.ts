import { Router } from 'express';
import dayController from '../../controllers/day';

const router = Router();

router.get('/:month/:day/:year', dayController.getDay);
//router.get('/:dayId', dayController.GetDayById);
export default router
