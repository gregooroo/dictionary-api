import { Router } from "express";
import { catchAsyncAwaitErrors } from "../../utils/errorHandlers";
import * as usersController from "./users.controller";
import * as middlewares from "./users.middleware";

// All routers are loaded in src/server.ts file

const router = Router();

// /api/users
router.post(
    "/",
    middlewares.validateBody,
    catchAsyncAwaitErrors(usersController.createUser),
);

router.post(
    "/login",
    middlewares.basicAuth,
    catchAsyncAwaitErrors(usersController.loginUser),
);

export default router;
