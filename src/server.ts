import express from "express";
import { AddressInfo } from "net";

const app = express();

export function start(): void {
    if (!process.env.PORT) {
        throw new Error("Missing PORT environmental variable");
    }

    const server = app.listen(process.env.PORT, function serverStarted() {
        const { port } = server.address() as AddressInfo;
        console.log(`Server started: PORT ${port}`);
    });
}
