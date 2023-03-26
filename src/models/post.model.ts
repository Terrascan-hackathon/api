import mongoose, { Schema } from 'mongoose';
import * as interfaces from '../interfaces/interfaces';

const PostSchema: Schema = new Schema (
    {
        _id: { type: mongoose.Types.ObjectId },
        title: { type: String, required: true },
        image: { type: String },
        severity: { type: Number, enum:[0, 1, 2] },
        description: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<interfaces.IPost>('Post', PostSchema);
