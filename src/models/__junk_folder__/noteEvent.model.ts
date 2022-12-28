
import { Schema, model, } from "mongoose";

export interface INoteEvent {
	note: string;
}

const noteEventSchema = new Schema<INoteEvent>(
	{
		note: { type: String, required: true },
	},
);

export default model<INoteEvent>("NoteEvent", noteEventSchema);



