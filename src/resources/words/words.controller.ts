import type { NextFunction, Request, Response } from "express";
import Model from "./words.model";

export async function createWord(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const result = await Model.create(req.body);
        res.status(200).json({ result });
    } catch (err) {
        return next(err);
    }
}

export async function getWords(
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const result = await Model.find({}).lean();
        res.status(200).json({ result });
    } catch (err) {
        return next(err);
    }
}
