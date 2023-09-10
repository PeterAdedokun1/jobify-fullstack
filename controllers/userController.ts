import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel"
import Job from "../models/JobModel"
import { Request, Response } from "express"

export const getCurrentUser = async (req: Request, res: Response) => {
    const findUser = await User.findOne({ _id: req.user?.userId });
    const user = findUser?.toJSON()
    res.status(StatusCodes.OK).json({ user});
}

export const getApplicationStats = async (req: Request, res: Response) => {
    const user = await User.countDocuments();
    const jobs = await Job.countDocuments();

    res.status(StatusCodes.OK).json({ user, jobs});
};
export const updateUser = async (req: Request, res: Response) => {
    const obj = { ...req.body };
    delete obj.password
    const updatedUser = await User.findByIdAndUpdate(req.user?.userId, obj);

    res.status(StatusCodes.OK).json({ msg: 'update user' });
};