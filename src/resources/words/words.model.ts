import { Schema, model, Document, Types } from "mongoose";

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

const arrayValidator = {
    validator(arr: string[]) {
        return Array.isArray(arr) && arr.length !== 0;
    },
    message: "{PATH} must be an array with at least one value",
};

wordSchema.path("translations").validate(arrayValidator);
wordSchema.path("examples").validate(arrayValidator);

export default model<Word>("Word", wordSchema);
