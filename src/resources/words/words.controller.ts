import type { Request, Response } from "express";
import Model from "./words.model";

export async function createWord(req: Request, res: Response): Promise<void> {
    try {
        const result = await Model.create(req.body);
        res.status(200).json({ result });
    } catch (err) {
        res.send(err);
    }
}

export async function getWords(_req: Request, res: Response): Promise<void> {
    try {
        const result = await Model.find({}).lean();
        res.status(200).json({ result });
    } catch (err) {
        res.send(err);
    }
}
