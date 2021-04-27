import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConfigValue } from "../../utils/config";
import { RestError } from "../../utils/errorHandlers";
import Model from "./users.model";

export async function createUser(req: Request, res: Response): Promise<void> {
    const { username, email } = await Model.create(req.body);

    res.json({
        success: true,
        result: `Username ${username} (${email}) created successfully`,
    });
}

export async function loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    // 1. Check if Basic header exists and isn't empty
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

    // 2. Extract data from this header
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const [username, password] = Buffer.from(base64Credentials, "base64")
        .toString()
        .split(":");

    // 3. Authenticate the User
    // Check if exists
    // Validate passwords
    const user = await Model.authenticate(username, password);
    if (user instanceof RestError) {
        return next(user);
    }

    const token = jwt.sign(user, getConfigValue("JWT_SECRET_KEY"), {
        expiresIn: getConfigValue("JWT_EXPIRATION_TIME"),
    });

    res.json({
        success: true,
        result: token,
    });
}
