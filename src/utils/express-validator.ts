import type { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { RestError } from "./errorHandlers";

/**
 * String Field Validator
 *
 * By default string is trimmed and converted to lowercase at the end of this validation chain
 *
 * @param name Field name to validate (request body)
 * @param message Message when field is empty / missing
 * @param sanitizers OPTIONAL: trim value before other validators and lowercase after all
 * @returns
 */
export function stringFieldValidator(
    name: string,
    message: string,
    sanitizers: { trim?: boolean; lowercase?: boolean } = {
        trim: true,
        lowercase: true,
    },
): ValidationChain {
    const validator = body(name);

    if (sanitizers.trim) {
        validator.trim();
    }

    validator.not().isEmpty().withMessage(message);

    if (sanitizers.lowercase) {
        validator.toLowerCase();
    }

    return validator;
}

/**
 * Array Field Validator.
 *
 * This validator requires an array to have at least one value inside
 *
 * @param name Field name to validate (request body)
 * @param message Message when field is empty / missing
 * @returns
 */
export function arrayFieldValidator(
    name: string,
    message: string,
): ValidationChain {
    return body(name).isArray({ min: 1 }).withMessage(message);
}

/**
 * Express Validator Result
 *
 * Extracts the validation errors from a request and passes them down (if any occur)
 * in middleware chain as an instance of RestError class
 *
 * @param req Express Request Object
 * @param _res Express Response Object
 * @param next - Express Next Middleware
 * @returns
 */
export function expressValidatorResult(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
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
}

export * from "express-validator";
