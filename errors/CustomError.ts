import { StatusCodes } from "http-status-codes"

export class NotFoundError extends Error {
    public name: string;
    public statusCodes: number
    constructor(message: string) {
        super(message)
        this.name = "NotFoundError";
        this.statusCodes = StatusCodes.NOT_FOUND;
    }
}