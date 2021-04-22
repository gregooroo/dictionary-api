import type { NextFunction, Request, Response } from "express";
import { RestError } from "../../utils/errorHandlers";
import Model from "./words.model";

export async function createWord(req: Request, res: Response): Promise<void> {
    const result = await Model.create(req.body);

    res.status(200).json({
        success: true,
        result,
    });
}

export async function getWords(_req: Request, res: Response): Promise<void> {
    const result = await Model.find({}).lean();

    res.status(200).json({
        success: true,
        result,
    });
}

export async function getWord(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const { id } = req.params;

    const result = await Model.findById(id).lean();

    if (!result) {
        return next(
            new RestError(404, "Not Found", "ID not found in database", { id }),
        );
    }

    res.status(200).json({
        success: true,
        result,
    });
}

export async function updateWord(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const { id } = req.params;

    const result = await Model.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    }).lean();

    if (!result) {
        return next(
            new RestError(404, "Not Found", "ID not found in database", { id }),
        );
    }

    res.status(200).json({
        success: true,
        result,
    });
}
