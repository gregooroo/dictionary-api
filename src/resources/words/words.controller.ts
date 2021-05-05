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

export async function getWords(req: Request, res: Response): Promise<void> {
    let { page = 0, limit = 0 } = req.query;
    [page, limit] = [page, limit].map(Number);

    const result = await Model.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

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

    const result = await Model.findById(id).exec();

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
    }).exec();

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

export async function deleteWord(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const { id } = req.params;

    const result = await Model.findByIdAndDelete(id).exec();

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
