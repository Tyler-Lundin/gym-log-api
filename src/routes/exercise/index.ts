import { Router } from 'express';
import exerciseController from '../../controllers/exercise/index';

const exerciseRouter = Router();

exerciseRouter.get('/:dayId', exerciseController.getDayExercises);
exerciseRouter.post('/', exerciseController.postExercise);
exerciseRouter.delete('/:exerciseId', exerciseController.deleteExercise);

export default exerciseRouter;
