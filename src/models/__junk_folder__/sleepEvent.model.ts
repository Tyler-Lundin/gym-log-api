import { Schema, model, } from "mongoose";

export interface ISleepEvent {
	startTime: Date;
	endTime: Date;
}

const sleepEventSchema = new Schema<ISleepEvent>(
	{
		startTime: { type: Date, required: true },
		endTime: { type: Date, required: true },
	},
);

export default model<ISleepEvent>("SleepEvent", sleepEventSchema);


