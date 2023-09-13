import { BadRequestError, UnauthenticatedError } from './../errors/CustomError';
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
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('authentication invalid');
    }
    try {
        const payload = verifyJWT(token);
        const { userId, role } = payload as JwtPayload;
        //test user
        const testUser = userId === '6500a1803ef201cfc8ec2276';
        req.user = { userId, role, testUser };
        next();
    } catch (error) {

    }
}

export const checkForTestUser = (req: Request, res: Response, next: NextFunction) => {
    if (req?.user?.testUser) {
        throw new BadRequestError('Demo User. Read Only!');
    }
    next();
};
export const authorizePermissions = (...roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role)) {
            throw new UnauthenticatedError("Unauthorized to access this route")
        }
        next()
    }
}