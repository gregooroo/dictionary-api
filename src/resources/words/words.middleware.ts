import { Types } from "mongoose";
import {
    param,
    query,
    expressValidatorResult,
    stringFieldValidator,
    arrayFieldValidator,
    Meta,
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

/**
 *
 * @param otherField - Fields required for pagination to work
 * @returns
 */
function paginationParamsXORCheck(otherField: "page" | "limit") {
    /**
     * Express-validator custom validator
     *
     * If a field being validated is "page" then we're checking if "limit" is also provided (and vice versa)
     * The idea for this is to work like a XOR gate
     *
     * @param _value - value of the field being validated
     * @param meta - object contains express request, location and field path
     * @returns
     */
    function check(_value: unknown, meta: Meta) {
        const { req } = meta;
        const requestQueryFields = Object.keys(
            req.query as Record<string, unknown>,
        );

        if (!requestQueryFields.includes(otherField)) {
            return false;
        }
        return true;
    }
    return check;
}

export const validatePaginationParams = [
    query("page")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Page must be greater than 0")
        .custom(paginationParamsXORCheck("limit"))
        .withMessage(
            `Missing "limit" pagination param. To fully support pagination both "page" and "limit" must be provided`,
        ),
    query("limit")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("Limit must be greater than 0")
        .custom(paginationParamsXORCheck("page"))
        .withMessage(
            `Missing "page" pagination param. To fully support pagination both "page" and "limit" must be provided`,
        ),
    expressValidatorResult,
];
