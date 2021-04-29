declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: string;
                username: string;
                iat?: number;
                exp?: number;
            };
            token?: string;
        }
    }
}

export {};
