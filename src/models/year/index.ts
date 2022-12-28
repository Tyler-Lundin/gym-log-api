import { Schema, model } from 'mongoose';
import { Year } from '../types';

const yearSchema = new Schema<Year>({
    year: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    months: [{ type: Schema.Types.ObjectId, ref: 'Month' }],
    stats: {
        totalEvents: { type: Number, default: 0 },
        exercises: { type: Object, default: {} },
        tags: { type: Object, default: {} },
    }
}, { collection: 'year', timestamps: true });

export default model<Year>('Year', yearSchema);

