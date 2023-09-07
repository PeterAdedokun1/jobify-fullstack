import { verify } from 'crypto';
import { UnauthenticatedError } from './../errors/CustomError';
import { NextFunction, Request, Response } from "express"
import { verifyJWT } from '../utils/tokenUtils';
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('authentication invalid');
    }
    try {
        const payload = verifyJWT(token);
        const { userId, role } = payload as JwtPayload;
        req.user = { userId, role };
        next();
    } catch (error) {

    }
}