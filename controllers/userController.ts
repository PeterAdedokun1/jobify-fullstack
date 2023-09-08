import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel"
import Job from "../models/JobModel"
import { Request, Response } from "express"

export const getCurrentUser = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({msg: "get current user"})
}

export const getApplicationStats = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: 'application stats' });
};
export const updateUser = async (req: Request, res:Response) => {
    res.status(StatusCodes.OK).json({ msg: 'update user' });
};