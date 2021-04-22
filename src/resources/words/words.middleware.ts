import { Types } from "mongoose";
import {
    param,
    expressValidatorResult,
    stringFieldValidator,
    arrayFieldValidator,
} from "../../utils/express-validator";

export const validateBody = [
    stringFieldValidator("word", "Word is required"),

    stringFieldValidator("definition", "Definition is required"),

    arrayFieldValidator(
        "translations",
        "Translations must be an array with at least one value",
    ),

    stringFieldValidator("translations.*", "Empty field"),

    arrayFieldValidator(
        "examples",
        "Examples must be an array with at least one value",
    ),

    stringFieldValidator("examples.*", "Empty field", { lowercase: false }),

    stringFieldValidator("partOfSpeech", "Part of speech is required")
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

    expressValidatorResult,
];

export const validateMongoDbId = [
    param("id")
        .custom((value) => {
            return Types.ObjectId.isValid(value);
        })
        .withMessage("Invalid ID"),
    expressValidatorResult,
];
