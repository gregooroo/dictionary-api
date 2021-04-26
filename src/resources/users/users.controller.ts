import type { Request, Response } from "express";
import Model from "./users.model";

export async function createUser(req: Request, res: Response): Promise<void> {
    const result = await Model.create(req.body);

    res.json({
        success: true,
        result,
    });
}
