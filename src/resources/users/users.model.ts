import { Schema, model, Document } from "mongoose";
import { duplicateFound } from "../../utils/db";

interface User extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
});

userSchema.post("save", duplicateFound);

export default model<User>("User", userSchema);
