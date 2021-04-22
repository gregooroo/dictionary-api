import { Schema, model, Document, Types, NativeError } from "mongoose";
import type { MongoError } from "mongodb";
import { RestError } from "../../utils/errorHandlers";

interface Word extends Document {
    word: string;
    definition: string;
    translations: Types.Array<string>;
    examples: Types.Array<string>;
    partOfSpeech:
        | "noun"
        | "pronoun"
        | "verb"
        | "adverb"
        | "adjective"
        | "preposition"
        | "conjunction"
        | "interjection";
}

const wordSchema = new Schema({
    word: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    definition: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    translations: [
        {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
    ],

    examples: [
        {
            type: String,
            required: true,
            trim: true,
        },
    ],

    partOfSpeech: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: [
            "noun",
            "pronoun",
            "verb",
            "adverb",
            "adjective",
            "preposition",
            "conjunction",
            "interjection",
        ],
    },
});

wordSchema.index({ word: 1, translations: 1 }, { unique: true });

interface DuplicateError extends MongoError {
    keyValue?: Record<string, unknown>;
}

wordSchema.post(
    "save",
    function duplicateFound(
        err: DuplicateError,
        _doc: Word,
        next: (err?: NativeError) => void,
    ) {
        if (err.code !== 11000 || err.name !== "MongoError") {
            return next();
        }

        return next(
            new RestError(
                409,
                "Duplicata Found",
                `Word "${err.keyValue?.word}" with translation "${err.keyValue?.translations}" already exists`,
                { ...err.keyValue },
            ),
        );
    },
);

const arrayValidator = {
    validator(arr: string[]) {
        return Array.isArray(arr) && arr.length !== 0;
    },
    message: "{PATH} must be an array with at least one value",
};

wordSchema.path("translations").validate(arrayValidator);
wordSchema.path("examples").validate(arrayValidator);

export default model<Word>("Word", wordSchema);
