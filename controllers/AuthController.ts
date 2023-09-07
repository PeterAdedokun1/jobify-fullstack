import { Request, Response } from "express"
import User from "../models/UserModel"
import { StatusCodes } from "http-status-codes"
import bcrypt from 'bcryptjs';
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { UnauthenticatedError } from "../errors/CustomError";
// import 
export const register = async (req: Request, res: Response) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
   const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.OK).json({msg: "user created"})
}
export const login = async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });

    const isValidUser = user && await comparePassword(req.body.password, user.password);
    if (!isValidUser) {
        throw new UnauthenticatedError("invalid credentials");
    }
    res.send("successfully")
}