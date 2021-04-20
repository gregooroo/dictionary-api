import { Router } from "express";
import * as wordsController from "./words.controller";

// All routers are loaded in src/server.ts file

const router = Router();

// /api/words
router.post("/", wordsController.createWord);

export default router;
