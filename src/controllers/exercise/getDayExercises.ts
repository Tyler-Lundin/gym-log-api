import ExerciseModel from "../../models/exercise";
import { Request, Response } from "express";
import DayModel from "../../models/day";

const getDayExercises = async ( req: Request, res: Response ) => {
    try {
        const { userId } = req;
        const { dayId } = req.params;

        const day = await DayModel.findById( dayId );
        if ( !day ) return res.status(404).json({ message: 'Day not found' });
        if ( day.userId.toString() !== userId ) return res.status(401).json({ message: 'Not authorized' });

        const exercises = await ExerciseModel.find({ dayId, userId });
        if ( !exercises ) return res.status(404).json({ message: 'Exercises not found' });
        return res.status(200).json({ message: 'Exercises found', exercises });
    } catch (error: any) {
        console.log( { error } );
        return res.status(500).json({ message: 'Server error while getting day exercises' });
    }
}

export default getDayExercises;
