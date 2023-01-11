import ExerciseModel from "../../models/exercise";
import validateExercise from "../../utils/validateExercise";
import { Request, Response } from "express";
import DayModel from "../../models/day";

const postExercise = async ( req: Request, res: Response ) => {
    try {
        const { userId } = req;
        const { exercise } = req.body;
        if ( !exercise ) return res.status(400).json({ message: 'Missing exercise data' });
        const { message, isValid } = validateExercise( exercise );
        if (!isValid ) return res.status(400).json({ message });

        const newExercise = new ExerciseModel({ ...exercise, userId });
        await newExercise.save();

        const day = await DayModel.findById( exercise.dayId );
        if ( !day ) return res.status(404).json({ message: 'Day not found' });
        if ( day.userId.toString() !== userId ) return res.status(401).json({ message: 'Not authorized' });
        day.exercises.push( newExercise._id );
        const newExerciseStats = {
            totalWeight: day.stats.exercises.totalWeight + exercise.weight,
            totalReps: day.stats.exercises.totalReps + exercise.reps,
            totalSets: day.stats.exercises.totalSets + exercise.sets,
        }

        const  updatedStats = {
            exercises: newExerciseStats,
            tags: {
                ...day.stats.tags,
                [exercise.tags]: {
                    tagCount: day.stats.tags[exercise.tags] ? day.stats.tags[exercise.tags].tagCount + 1 : 1,
                    tagLocations: [...day.stats.tags[exercise.tags] ? day.stats.tags[exercise.tags].tagLocations : [], newExercise._id]
                }
            }
        }

        day.stats = updatedStats;


        await day.save();

        return res.status(200).json({ message: 'Exercise saved successfully', exercise: newExercise });

    } catch (error: any) {
        console.log( { error } );
        return res.status(500).json({ message: 'Server error' });
    }
}

export default postExercise;
