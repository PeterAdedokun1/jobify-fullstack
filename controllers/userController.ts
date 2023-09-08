import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel"
import Job from "../models/JobModel"
import { Request, Response } from "express"

export const getCurrentUser = async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.user?.userId });
    const userWithoutPassword = user?.toJSON()
    res.status(StatusCodes.OK).json({ userWithoutPassword});
}

export const getApplicationStats = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: 'application stats' });
};
export const updateUser = async (req: Request, res: Response) => {
    const updatedUser = await User.findByIdAndUpdate(req.user?.userId, req.body);
    res.status(StatusCodes.OK).json({ msg: 'update user' });
};