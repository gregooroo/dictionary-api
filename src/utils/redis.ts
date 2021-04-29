import redis, { RedisClient } from "redis";

let connection: RedisClient | undefined;

interface RedisConnection extends RedisClient {
    selected_db: string;
    connection_options: { port: number };
}

function getConnection(client: RedisClient | undefined) {
    if (!client || typeof client === "undefined") {
        throw new Error("Redis database not connected");
    }

    return client;
}

export function connect(
    redisUrl: string,
): Promise<{ port: number; selectedDb: string }> {
    return new Promise((resolve, reject) => {
        connection = redis.createClient(redisUrl);

        connection.on("error", (err) => reject(err));

        connection.on("ready", function redisConnected(this: RedisConnection) {
            resolve({
                port: this.connection_options.port,
                selectedDb: this.selected_db,
            });
        });
    });
}
