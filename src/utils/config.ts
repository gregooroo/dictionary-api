type ConfigValues = {
    readonly PORT: number;
    readonly MONGODB_URL: string;
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

    return value;
}
