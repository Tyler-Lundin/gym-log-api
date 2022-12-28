import { Schema, model } from "mongoose";
import { Day } from "../../models/types";

const daySchema = new Schema<Day>(
	{
        weekday: { type: String, required: true },
        date: { type: String, required: true },
        userId: { type: String, ref: 'User', required: true },
        exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: [] }],
        stats: {
            exercises: { type: Object, default: {} },
            tags: { type: Object, default: {} },
        }
	},
	{ collection: 'days', timestamps: true }
);

const DayModel = model<Day>("Day", daySchema);

export default DayModel;
