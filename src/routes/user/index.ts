
import { Router } from 'express';

const router = Router();



router.delete('/user', userController.deleteUser);


export default router;
