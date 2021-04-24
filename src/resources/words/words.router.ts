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

router
    .route("/:id")
    .get(
        middlewares.validateMongoDbId,
        catchAsyncAwaitErrors(wordsController.getWord),
    )
    .patch(
        middlewares.validateMongoDbId,
        middlewares.validateBody,
        catchAsyncAwaitErrors(wordsController.updateWord),
    )
    .delete(
        middlewares.validateMongoDbId,
        catchAsyncAwaitErrors(wordsController.deleteWord),
    );

export default router;
