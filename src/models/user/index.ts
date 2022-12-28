import {randomUUID} from "crypto";
import { Schema, model } from "mongoose";
import { User } from "@models/types";

const userSchema = new Schema<User>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
        sessionId: { type: String, default: randomUUID() },
        days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
        settings: {
            theme: { type: String, default: 'light' },
            language: { type: String, default: 'english' }
        },
        stats: {
            exercises: { type: Object, default: {} },
            tags: { type: Object, default: {} },
        }
	},
	{ timestamps: true, }
);

export default model('User', userSchema);
