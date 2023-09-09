import { Request, Response } from "express"
import User from "../models/UserModel"
import { StatusCodes } from "http-status-codes"
import bcrypt from 'bcryptjs';
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { UnauthenticatedError } from "../errors/CustomError";
import { createJWT } from "../utils/tokenUtils";
export const register = async (req: Request, res: Response) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.OK).json({ msg: "user created" })
}
export const login = async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });

    const isValidUser = user && await comparePassword(req.body.password, user.password);
    if (!isValidUser) {
        throw new UnauthenticatedError("invalid credentials");
    }

    const token = createJWT({ userId: user._id, role: user.role })
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    })
    res.status(StatusCodes.OK).json({ msg: "user logged in" })
}

export const logout = (req: Request, res: Response) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),

    })
    res.status(StatusCodes.OK).json({ msg: "user logged out" })
}