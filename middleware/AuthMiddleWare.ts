import { UnauthenticatedError } from './../errors/CustomError';
import { NextFunction, Request, Response } from "express"

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('authentication invalid');
    }
    next();
}