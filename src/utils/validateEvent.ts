import { Event, Exercise } from '../models/types';
import ValidateExercise from './validateExercise';

const validateEvent = (event: Event):event is Exercise  => {
	const errors: string[] = [];
	let { type, dayId, userId, time, tags } = event;

    if ( !event ) return false;
    if ( !type )    errors.push( 'Missing type' );
	if ( !dayId )   errors.push( 'dayId is required' );
    if ( !userId )  errors.push( 'userId is required' );
	if ( !time )    errors.push( `error validating Event ~ ${type || ''}Event.time = null"` );
    if ( !tags )    tags = [{label:`${type}`,color: 'none'}];

	console.log('m`validation errors: ', errors);

	if ( errors.length > 0 ) return false;

	switch( type ) {
		case 'exercise': return ValidateExercise(event as Exercise);
		// add more event validators here
		default: return false;
	}
}
export default validateEvent;


