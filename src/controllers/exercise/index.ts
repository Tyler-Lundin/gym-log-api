import ExerciseModel from "../../models/exercise";
import validateExercise from "../../utils/validateExercise";
import { Request, Response } from "express";
import DayModel from "../../models/day";
import { Exercise } from "@models/types";


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
        await day.save();

        return res.status(200).json({ message: 'Exercise saved successfully', exercise: newExercise });

    } catch (error: any) {
        console.log( { error } );
        return res.status(500).json({ message: 'Server error' });
    }
}

const deleteExercise = async ( req: Request, res: Response ) => {
    const { userId } = req;
    const { exerciseId } = req.params;
    try {
        const exercise = await ExerciseModel.findByIdAndDelete(exerciseId);
        if ( !exercise ) return res.status(404).json({ message: "Exercise not found" });
        if ( exercise.userId.toString() !== userId ) return res.status(401).json({ message: "Not authorized" });
        return res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error: any) {
        console.log( { error } );
        return res.status(500).json({ message: 'Server error while deleteing exercise' });
    }
}







export default {
    getDayExercises,
    postExercise,
    deleteExercise,
}


