// src/models/exercise/validateExercise.ts
// called from src/models/validateEvent.ts


import { Event, Exercise } from '@models/types';

const ValidateExercise = (ExerciseEvent: any ):ExerciseEvent is Exercise => {
	const { exercise, weight, reps } = ExerciseEvent;
	if (!exercise || !weight || !reps) return false;
	if (typeof exercise !== 'string') return false;
	if (typeof weight !== 'number') return false;
	if (typeof reps !== 'number') return false;
	if (weight < 0 || reps < 0) return false;
	return true;
}

export default ValidateExercise;
