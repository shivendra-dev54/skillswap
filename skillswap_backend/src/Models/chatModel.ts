import mongoose, { Schema, Document } from "mongoose";

interface IChat extends Document {
    sender: string;
    receiver: string;
    message: string;
    timestamp: Date;
}

const ChatSchema = new Schema<IChat>({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
