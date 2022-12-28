import { Schema, model } from 'mongoose';
import { Month } from '../types';

const monthSchema = new Schema<Month>({
    month: { type: Number, required: true },
    yearId: { type: Schema.Types.ObjectId, ref: 'Year', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    weeks: [{ type: Schema.Types.ObjectId, ref: 'Week' }],
}, { collection: 'month', timestamps: true });

export default model<Month>('Month', monthSchema);
