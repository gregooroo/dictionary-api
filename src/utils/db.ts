import mongoose, { Connection, ConnectionOptions, NativeError } from "mongoose";
import type { MongoError } from "mongodb";
import { RestError } from "../utils/errorHandlers";

export function connect(
    dbUrl: string,
    options: ConnectionOptions,
): Promise<{ port: number; name: string }> {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbUrl, options, (err) => reject(err));

        const db = mongoose.connection;

        db.once("open", function databaseStarted(this: Connection) {
            const { port, name } = this;
            resolve({ port, name });
        });

        db.on("error", (err) => reject(err));
    });
}

/**
 * This interface is useful to extract information which fields caused a "duplicate error".
 *
 * It's much easier to just use an object that looks like this:
 * { word: "agriculture", translations: "rolnictwo" }
 * instead of parsing a message that looks like this:
 * "E11000 duplicate key error collection: dictionary-api.words index: word_1_translations_1 dup key: { word: \"agriculture\", translations: \"rolnictwo\" }"
 */
interface DuplicateError extends MongoError {
    keyValue?: Record<string, string>;
}
export function duplicateFound<T>(
    err: DuplicateError,
    _doc: T,
    next: (err?: NativeError) => void,
): void {
    if (err.code !== 11000 || err.name !== "MongoError") {
        return next();
    }

    return next(
        new RestError(
            409,
            "Duplicata Found",
            `Please check details to see which field(s) caused this error`,
            { ...err.keyValue },
        ),
    );
}
