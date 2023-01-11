import { Schema, model } from 'mongoose';
import { IFriendRequest } from '../types';

const friendRequestSchema = new Schema<IFriendRequest>({
    from: { type: String, ref: 'User', required: true },
    to: { type: String, ref: 'User', required: true },
    status: { type: String, required: true },
    message: { type: String, required: true },
}, { collection: 'friendRequest', timestamps: true });

const FriendRequestModel = model<IFriendRequest>('FriendRequest', friendRequestSchema);

export default FriendRequestModel;


