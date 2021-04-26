import {
    stringFieldValidator,
    expressValidatorResult,
} from "../../utils/express-validator";

export const validateBody = [
    stringFieldValidator("username", "Username is required"),

    stringFieldValidator("email", "Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    stringFieldValidator("password", "Password is required", {
        trim: false,
        lowercase: false,
    })
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    expressValidatorResult,
];
