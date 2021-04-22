import { Router } from "express";
import * as middlewares from "./words.middleware";
import * as wordsController from "./words.controller";

// All routers are loaded in src/server.ts file

const router = Router();

// /api/words
router.post("/", middlewares.validateBody, wordsController.createWord);

router.get("/", wordsController.getWords);

router.get("/:id", middlewares.validateMongoDbId, wordsController.getWord);

export default router;
