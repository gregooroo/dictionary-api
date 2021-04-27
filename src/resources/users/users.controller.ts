import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConfigValue } from "../../utils/config";
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
    _next: NextFunction,
): Promise<void> {
    const token = jwt.sign(
        req.user as Record<string, string>,
        getConfigValue("JWT_SECRET_KEY"),
        {
            expiresIn: getConfigValue("JWT_EXPIRATION_TIME"),
        },
    );

    res.json({
        success: true,
        result: token,
    });
}
