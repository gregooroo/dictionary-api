export class RestError extends Error {
    constructor(
        public status: number,
        public name: string,
        public message: string,
        public details?: unknown,
    ) {
        super(message);
    }
}
