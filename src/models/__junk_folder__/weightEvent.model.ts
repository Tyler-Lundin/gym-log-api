import {model, Schema} from "mongoose";


export interface IWeightEvent {
	weight: number;
}

export const weightEventSchema = new Schema({
	weight: {type: Number, required: true},
});

export default model("WeightEvent", weightEventSchema);
