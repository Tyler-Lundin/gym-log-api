import { Event } from "@models/types";
import { model, Schema } from "mongoose";

export const eventSchema = new Schema<Event>(
	{
		type: { type: String, required: true },
		dayId: { type: String, ref: 'Day', required: true },
		userId: { type: String,  ref: 'User', required: true },
		time: { type: String, required: true },
        tags: { type: [{ label: String, color: String }] },
	}
);

const Event = model<Event>("Event", eventSchema);

export default Event;
