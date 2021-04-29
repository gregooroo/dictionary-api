import { Schema, model, Document, Model } from "mongoose";
import { duplicateFound } from "../../utils/db";
import bcrypt from "bcryptjs";
import { RestError } from "../../utils/errorHandlers";

interface User extends Document {
    username: string;
    email: string;
    password: string;
}

interface UserModel extends Model<User> {
    authenticate(
        username: string,
        password: string,
    ): Promise<{ _id: string; username: string } | RestError>;
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

userSchema.statics.authenticate = async function authenticate(
    this: UserModel,
    username: string,
    password: string,
) {
    const user = await this.findOne({ username }).lean();
    if (!user) {
        return new RestError(401, "Unauthorized", "User not found", {
            username,
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return new RestError(401, "Unauthorized", "Incorrect password");
    }

    return { _id: String(user._id), username: user.username };
};

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

export default model<User, UserModel>("User", userSchema);
