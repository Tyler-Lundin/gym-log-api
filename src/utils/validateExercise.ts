// src/models/exercise/validateExercise.ts
// called from src/models/validateEvent.ts

const validateExercise = ( ExerciseData: { [datakey: string]: any } ) => {
    const errors: string[] = [];

    let { dayId, time, tags, weight, reps, exercise } = ExerciseData;
    if ( !dayId ) errors.push( 'Day id is required' );
    if ( !time ) errors.push( 'Time is required' );
    if ( !tags ) errors.push( 'Tags are required' );
    if ( !weight ) errors.push( 'Weight is required' );
    if ( !reps ) errors.push( 'Reps are required' );
    if ( !exercise ) errors.push( 'Exercise is required' );

    if ( errors.length > 0 ) return { message: `Exercise Data Invalid: ${errors.join(' / ')}`, isValid: false };
    return { message: 'Exercise Data Valid', isValid: true };
}

export default validateExercise;
