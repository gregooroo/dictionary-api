import express from "express";
import { AddressInfo } from "net";
import wordsRouter from "./resources/words/words.router";
import usersRouter from "./resources/users/users.router";
import { connect } from "./utils/db";
import { dispalyErrors, routeNotFound } from "./middlewares/errorHandlers";

const app = express();

app.use(express.json());

app.use("/api/words", wordsRouter);
app.use("/api/users", usersRouter);

app.use(routeNotFound);
// This middleware must be the last one
app.use(dispalyErrors);

export async function start(): Promise<void> {
    // TODO: refactor this cause it's starting to look weird
    if (!process.env.PORT) {
        throw new Error("Missing PORT environmental variable");
    } else if (!process.env.MONGODB_URL) {
        throw new Error("Missing MONGODB_URL environmental variable");
    }

    const { port, name } = await connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    console.log(`Database started: PORT: ${port}, DB_NAME: ${name}`);

    const server = app.listen(process.env.PORT, function serverStarted() {
        const { port } = server.address() as AddressInfo;
        console.log(`Server started: PORT ${port}`);
    });
}
