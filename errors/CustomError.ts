import { StatusCodes } from "http-status-codes"

export class NotFoundError extends Error {
    public name: string;
    public statusCode: number
    constructor(message: string) {
        super(message)
        this.name = "NotFoundError";
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
export class BadRequestError extends Error {
    public name: string;
    public statusCode: number
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export class UnauthenticatedError extends Error {
    public name: string;
    public statusCode: number
    constructor(message: string) {
        super(message);
        this.name = 'UnauthenticatedError';
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
