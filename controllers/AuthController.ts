import { Request, Response } from "express"
import User from "../models/UserModel"
import { StatusCodes } from "http-status-codes"
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.OK).json({ user })
}
export const login = async (req: Request, res: Response) => {
    res.send("login")
}