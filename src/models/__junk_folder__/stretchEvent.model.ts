import {Schema, model} from "mongoose";


export interface IStretchEvent {
	stretch: string;
	duration: number;
}

export const stretchSchema = new Schema({
	stretch: {type: String, required: true},
	duration: {type: Number, required: true}
});

export default model<IStretchEvent>("StretchEvent", stretchSchema);


