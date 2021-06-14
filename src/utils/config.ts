type ConfigValues = {
    readonly NODE_ENV: string;
    readonly PORT: number;
    readonly MONGODB_URL: string;
    readonly REDIS_URL: string;
    readonly JWT_SECRET_KEY: string;
    readonly JWT_EXPIRATION_TIME: number;
};

export function getConfigValue<T extends keyof ConfigValues>(
    name: T,
): ConfigValues[T];
export function getConfigValue(
    name: keyof ConfigValues,
): ConfigValues[keyof ConfigValues] {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing ${name} environmental variable`);
    }

    if (name === "PORT" || name === "JWT_EXPIRATION_TIME") {
        return Number(value);
    }

    return value;
}
