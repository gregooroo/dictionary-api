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
    // This map below prevents from this:
    // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.",
    [page, limit] = [page, limit].map(Number);

    // Second aggregate pipelie
    let data;
    // By default we want just to remove versionKey from returned documents
    const defaults = [{ $unset: "__v" }];

    if (page && limit) {
        // If page and limit are provided - do pagination
        data = [
            ...[{ $skip: (page - 1) * limit }, { $limit: limit * 1 }],
            ...defaults,
        ];
    } else {
        data = [...defaults];
    }

    const result = await Model.aggregate([
        {
            $facet: {
                totalItems: [
                    {
                        $group: { _id: null, count: { $sum: 1 } },
                    },
                ],
                data,
            },
        },
        {
            $unwind: "$totalItems",
        },
        {
            $project: {
                totalItems: "$totalItems.count",
                items: "$data",
            },
        },
    ]).exec();

    res.status(200).json({
        success: true,
        result: result[0],
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
