import ExerciseModel from "../../models/exercise";
import ValidateExercise from "../../utils/validateExercise";
import { Request, Response } from "express";

const postExercise = async ( req: Request, res: Response ) => {

    try {
        console.log( 'postExercise: ', req.body );
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


const getExerciseByDate = async ( req: Request, res: Response ) => {
    const { userId } = req;
    const { year, month, day } = req.params;
    try {
        const exercises = await ExerciseModel.find({ userId, year, month, day });
        return res.status(200).json({ exercises });
    } catch (error: any) {
        console.log( { error } );
        return res.status(500).json({ message: 'Server error while getting exercise by date' });
    }
}

const getExercisesByMonth = async ( req: Request, res: Response ) => {
    const { userId } = req;
    const { year, month } = req.params;
    try {
        const exercises = await ExerciseModel.find({ userId, year, month });
        return res.status(200).json({ exercises });
    } catch (error: any) {
        console.log( { error } );
        return res.status(500).json({ message: 'Server error while getting exercises by month' });
    }
}

const getExercisesByYear = async ( req: Request, res: Response ) => {
    const { userId } = req;
    const { year } = req.params;
    try {
        const exercises = await ExerciseModel.find({ userId, year });
        return res.status(200).json({ exercises });
    } catch (error: any) {
        console.log( { error } );
        return res.status(500).json({ message: 'Server error while getting exercises by year' });
    }
}



export default {
    postExercise,
    deleteExercise,
    getExerciseByDate,
    getExercisesByMonth,
    getExercisesByYear,
}


