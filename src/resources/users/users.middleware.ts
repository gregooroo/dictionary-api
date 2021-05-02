import type { Request, Response, NextFunction } from "express";
import {
    stringFieldValidator,
    expressValidatorResult,
} from "../../utils/express-validator";
import { RestError } from "../../utils/errorHandlers";
import Model from "./users.model";
import { getAuthHeader } from "../../utils/auth";

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

export async function basicAuth(
    req: Request,
    _res: Response,
    next: NextFunction,
): Promise<void> {
    const base64Credentials = getAuthHeader("Basic", req);

    if (!base64Credentials) {
        return next(
            new RestError(
                401,
                "Unauthorized",
                "Missing Basic authorization header",
            ),
        );
    }

    const [username, password] = Buffer.from(base64Credentials, "base64")
        .toString()
        .split(":");

    const user = await Model.authenticate(username, password);
    if (user instanceof RestError) {
        return next(user);
    }

    req.user = user;
    next();
}
