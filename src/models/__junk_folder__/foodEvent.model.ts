import { Schema, model, } from "mongoose";

export interface IFoodEvent {
	food: string;
	foodQuantity: number;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	cholestrol: number;
	sodium: number;
	potassium: number;
	fiber: number;
	sugar: number;
	vitaminA: number;
	vitaminC: number;
	calcium: number;
	iron: number;
}

const foodEventSchema = new Schema<IFoodEvent>(
	{
		food: { type: String, required: true },
		foodQuantity: { type: Number, required: true },
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbs: { type: Number, required: true },
		fat: { type: Number, required: true },
		cholestrol: { type: Number, required: true },
		sodium: { type: Number, required: true },
		potassium: { type: Number, required: true },
		fiber: { type: Number, required: true },
		sugar: { type: Number, required: true },
		vitaminA: { type: Number, required: true },
		vitaminC: { type: Number, required: true },
		calcium: { type: Number, required: true },
		iron: { type: Number, required: true },
	},
);

export default model<IFoodEvent>("FoodEvent", foodEventSchema);



