import { Router } from "express";
import * as middlewares from "./words.middleware";
import * as wordsController from "./words.controller";
import { catchAsyncAwaitErrors } from "../../utils/errorHandlers";

// All routers are loaded in src/server.ts file

const router = Router();

// /api/words

router
    .route("/")
    .post(
        middlewares.validateBody,
        catchAsyncAwaitErrors(wordsController.createWord),
    )
    .get(catchAsyncAwaitErrors(wordsController.getWords));

router.get(
    "/:id",
    middlewares.validateMongoDbId,
    catchAsyncAwaitErrors(wordsController.getWord),
);

export default router;
