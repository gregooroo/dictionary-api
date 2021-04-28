import type { Request } from "express";

export function getAuthHeader(
    name: "Basic" | "Bearer",
    req: Request,
): string | false {
    if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf(name) === -1
    ) {
        return false;
    }

    return req.headers.authorization.split(" ")[1];
}
