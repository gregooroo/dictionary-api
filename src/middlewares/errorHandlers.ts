import type { Request, Response, NextFunction } from "express";
import { RestError } from "../utils/errorHandlers";

export function routeNotFound(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    const { method, originalUrl } = req;

    return next(
        new RestError(
            404,
            "Not Found",
            `Endpoint ${method} ${originalUrl} not found`,
        ),
    );
}

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
