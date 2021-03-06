import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getConfigValue } from "../utils/config";
import { RestError } from "../utils/errorHandlers";
import { isUser } from "../utils/types";
import { get } from "../utils/redis";

export async function authorizeUser(
    req: Request,
    _res: Response,
    next: NextFunction,
): Promise<void> {
    const { accessToken: token } = req.cookies;

    if (!token) {
        return next(new RestError(403, "Forbidden", "Missing Token"));
    }

    try {
        const isBlacklisted = await get(token);

        if (isBlacklisted) {
            return next(new RestError(403, "Forbidden", "Invalid Token"));
        }

        const user = jwt.verify(token, getConfigValue("JWT_SECRET_KEY"));

        if (!isUser(user)) {
            return next(
                new RestError(
                    500,
                    "Unexpected Error",
                    "Missing UserInfo data inside token",
                    { user },
                ),
            );
        }

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        return next(err);
    }
}
