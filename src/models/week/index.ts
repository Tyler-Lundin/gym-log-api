import { Week } from "@models/types";
import { Schema, model } from "mongoose";

const weekSchema = new Schema<Week>({
    week: { type: Number, required: true },
    monthId: { type: Schema.Types.ObjectId, ref: 'Month', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    stats: {
        totalEvents: { type: Number, default: 0 },
        exercises: { type: Object, default: {} },
        tags: { type: Object, default: {} },
    }
}, { collection: 'week', timestamps: true });

export default model<Week>('Week', weekSchema);
