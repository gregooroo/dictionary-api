import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RestError } from "../../utils/errorHandlers";

export const validateBody = [
    body("word")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Word is required")
        .toLowerCase(),

    body("definition")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Definition is required")
        .toLowerCase(),

    body("translations")
        .isArray({ min: 1 })
        .withMessage("Translations must be an array with at least one value"),

    body("translations.*")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Empty field")
        .toLowerCase(),

    body("examples")
        .isArray({ min: 1 })
        .withMessage("Examples must be an array with at least one value"),

    body("examples.*").trim().not().isEmpty().withMessage("Empty field"),

    body("partOfSpeech")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Part of speech is required")
        .isIn([
            "noun",
            "pronoun",
            "verb",
            "adverb",
            "adjective",
            "preposition",
            "conjunction",
            "interjection",
        ])
        .withMessage("Invalid value"),

    function validate(req: Request, _res: Response, next: NextFunction): void {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        return next(
            new RestError(
                400,
                "Validation Failed",
                "Please check details to see what happened",
                errors.array(),
            ),
        );
    },
];
