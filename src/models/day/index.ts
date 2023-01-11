import { Schema, model } from "mongoose";
import { IDay } from "../../models/types";

const daySchema = new Schema<IDay>(
	{
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

const DayModel = model<IDay>("Day", daySchema);

export default DayModel;
