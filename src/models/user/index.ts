import {randomUUID} from "crypto";
import { Schema, model } from "mongoose";
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
	{
        username: { type: String, required: true, unique: true, trime: true, default: randomUUID() },
		email: { type: String, required: true, unique: true, lowercase: true, trime: true },
		password: { type: String, required: true },
        sessionId: { type: String, default: randomUUID(), required: true },
        days: [{ type: String, ref: 'Day' }],
        friends: [{ type: String, ref: 'User' }],
        friendCode: { type: String, default: randomUUID().slice(0, 6) },
        friendRequests: [{ type: String, ref: 'User' }],
        settings: {
            theme: { type: String, default: 'light' },
            language: { type: String, default: 'english' }
        },
	},
	{ timestamps: true, }
);

const UserModel = model('User', userSchema);

export default UserModel;
