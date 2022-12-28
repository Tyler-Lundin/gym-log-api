import { Schema, model } from 'mongoose';

export interface ITodoEvent {
	todo: string;
	isDone: boolean;
}

const TodoEventSchema = new Schema({
	todo: { type: String, required: true },
	isDone: { type: Boolean, required: true },
});

export default model<ITodoEvent>('TodoEvent', TodoEventSchema);
