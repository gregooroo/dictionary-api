import type { Request, Response } from "express";

export function createWord(_req: Request, res: Response): void {
    res.send("It works");
}
