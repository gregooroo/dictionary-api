import { Schema, model, Document } from "mongoose";
import { duplicateFound } from "../../utils/db";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function hashPassword(this: User, next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
});

userSchema.post("save", duplicateFound);

export default model<User>("User", userSchema);
