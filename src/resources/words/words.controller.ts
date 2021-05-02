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

export async function getWords(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    if (
        (req.query.page && !req.query.limit) ||
        (!req.query.page && req.query.limit)
    ) {
        if (!req.query.page) {
            return next(
                new RestError(
                    400,
                    "Validation Failed",
                    `Missing "page" query parameter`,
                    "To fully support pagination both page and limit must be provided",
                ),
            );
        } else {
            return next(
                new RestError(
                    400,
                    "Validation Failed",
                    `Missing "limit" query parameter`,
                    "To fully support pagination both page and limit must be provided",
                ),
            );
        }
    }

    let { page = 0, limit = 0 } = req.query;
    [page, limit] = [page, limit].map(Number);

    const result = await Model.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);

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

export async function deleteWord(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const { id } = req.params;

    const result = await Model.findByIdAndDelete(id).lean();

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
