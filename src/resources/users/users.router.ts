import { Router } from "express";
import { catchAsyncAwaitErrors } from "../../utils/errorHandlers";
import * as usersController from "./users.controller";

const router = Router();

router.post("/", catchAsyncAwaitErrors(usersController.createUser));

export default router;
