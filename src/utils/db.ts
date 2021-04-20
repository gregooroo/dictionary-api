import mongoose, { Connection, ConnectionOptions } from "mongoose";

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
