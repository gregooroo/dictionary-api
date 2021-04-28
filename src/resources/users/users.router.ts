import { Router } from "express";
import { authorizeUser } from "../../middlewares/auth";
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

// /api/users/login
router.post(
    "/login",
    middlewares.basicAuth,
    catchAsyncAwaitErrors(usersController.loginUser),
);

// /api/users/logout
router.post(
    "/logout",
    authorizeUser,
    catchAsyncAwaitErrors(usersController.logoutUser),
);

export default router;
