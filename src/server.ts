import express from "express";
import { AddressInfo } from "net";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import wordsRouter from "./resources/words/words.router";
import usersRouter from "./resources/users/users.router";
import { connect } from "./utils/db";
import { displayErrors, routeNotFound } from "./middlewares/errorHandlers";
import { getConfigValue } from "./utils/config";
import { connect as redisConnect } from "./utils/redis";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/words", wordsRouter);
app.use("/api/users", usersRouter);

app.use(routeNotFound);
// This middleware must be the last one
app.use(displayErrors);

export async function start(): Promise<void> {
    const { port, name } = await connect(getConfigValue("MONGODB_URL"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: PORT: ${port}, DB_NAME: ${name}`);

    const { port: redisPort, selectedDb } = await redisConnect(
        getConfigValue("REDIS_URL"),
    );
    console.log(
        `Redis connected: PORT: ${redisPort} SELECTED_DB: ${selectedDb}`,
    );

    const server = app.listen(getConfigValue("PORT"), function serverStarted() {
        const { port } = server.address() as AddressInfo;
        console.log(`Server started: PORT ${port}`);
    });
}
