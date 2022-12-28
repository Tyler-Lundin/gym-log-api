import { Schema, model } from "mongoose";
import { Exercise } from "../types";


const exerciseSchema = new Schema<Exercise>({
	dayId: { type: String, ref: 'Day', required: true },
	userId: { type: String,  ref: 'User', required: true },
	time: { type: String, required: true },
    tags: { type: [{ label: String, color: String }] },
	exercise: { type: String, required: true },
	weight: { type: Number, required: true },
	reps: { type: Number, required: true },
},{ collection: "exercise", timestamps: true });

const ExerciseModel = model<Exercise>("Exercise", exerciseSchema);

export default ExerciseModel;

