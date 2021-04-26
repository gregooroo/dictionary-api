import type { Request, Response } from "express";
import Model from "./users.model";

export async function createUser(req: Request, res: Response): Promise<void> {
    const { username, email } = await Model.create(req.body);

    res.json({
        success: true,
        result: `Username ${username} (${email}) created successfully`,
    });
}
