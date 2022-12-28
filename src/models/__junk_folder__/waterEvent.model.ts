import {model, Schema} from "mongoose";


export interface IWaterEvent {
	quantity: number;
	measurement: string;
}

export const waterEventSchema = new Schema({
	quantity: {type: Number, required: true},
	measurement: {type: String, required: true},
});

export default model<IWaterEvent>("WaterEvent", waterEventSchema);
