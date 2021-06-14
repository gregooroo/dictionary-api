import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConfigValue } from "../../utils/config";
import { isUser } from "../../utils/types";
import Model from "./users.model";
import { setWithTTL } from "../../utils/redis";
import { RestError } from "../../utils/errorHandlers";

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
    if (!isUser(req.user)) {
        return next(new TypeError("Malformed req.user"));
    }
    const token = jwt.sign(req.user, getConfigValue("JWT_SECRET_KEY"), {
        expiresIn: getConfigValue("JWT_EXPIRATION_TIME"),
    });

    res.cookie("accessToken", token, {
        expires: new Date(
            Date.now() + getConfigValue("JWT_EXPIRATION_TIME") * 1000,
        ),
        httpOnly: true,
        sameSite: "lax",
    });

    res.json({
        success: true,
        result: "Successfully logged in",
    });
}

export async function logoutUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    if (!isUser(req.user)) {
        return next(new TypeError("Malformed req.user"));
    }

    const now = Math.floor(Date.now() / 1000);
    const expirationTime = req.user.exp;
    const ttl = Number(expirationTime) - now;

    if (!req.token) {
        return next(new RestError(500, "Unexpected Error", "Mising Token"));
    }

    setWithTTL(req.token, "blacklisted", ttl);

    res.cookie("accessToken", req.token, {
        expires: new Date(Date.now() - 3600000),
    });

    res.json({
        success: true,
        result: "Successfully logged out",
    });
}
