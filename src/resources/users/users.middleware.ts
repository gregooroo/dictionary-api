import type { Request, Response, NextFunction } from "express";
import {
    stringFieldValidator,
    expressValidatorResult,
} from "../../utils/express-validator";
import { RestError } from "../../utils/errorHandlers";
import Model from "./users.model";

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
    if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf("Basic") === -1
    ) {
        return next(
            new RestError(
                401,
                "Unauthorized",
                "Missing Basic authorization header",
            ),
        );
    }

    const base64Credentials = req.headers.authorization.split(" ")[1];
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
