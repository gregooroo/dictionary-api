import type { Request, Response, NextFunction } from "express";
import type { RestError } from "../utils/errorHandlers";

export function dispalyErrors(
    err: RestError,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    const {
        status = 500,
        name = "Unexpected Error",
        message = "An Error Occured",
        details = {},
    } = err;

    res.status(status).json({
        success: false,
        name,
        message,
        details,
    });
}
