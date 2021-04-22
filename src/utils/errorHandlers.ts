import type { NextFunction, Request, Response } from "express";

/**
 * This utility is an alternative to try/catch blocks for handling errors inside async functions.
 *
 * Example:
 *
 * // Route Handler
 * async function getAllWords(req, res) {
 *      const result = await dbCall();
 *      res.json({result})
 * }
 *
 * // Router
 * router.get('/', catchAsyncAwaitErrors(getAllWords))
 *
 * All errors from getAllWords handler will be handled
 * somewhere else inside middleware chain (or at least they should be :D)
 *
 * @param fn Express Async Route Handler
 * @returns
 */
export function catchAsyncAwaitErrors(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
    return function catchErrors(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        return fn(req, res, next).catch(next);
    };
}

export class RestError extends Error {
    constructor(
        public status: number,
        public name: string,
        public message: string,
        public details?: unknown,
    ) {
        super(message);
    }
}
