import ExerciseModel from "../../models/exercise";
import { Request, Response } from "express";

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

export default deleteExercise;
