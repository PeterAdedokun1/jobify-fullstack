import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel"
import Job from "../models/JobModel"
import { Request, Response } from "express"
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
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
     const newUser = { ...req.body };
     delete newUser.password;
     if (req.file) {
       const response = await cloudinary.v2.uploader.upload(req.file.path);
       await fs.unlink(req.file.path);
       newUser.avatar = response.secure_url;
       newUser.avatarPublicId = response.public_id;
     }

     const updatedUser = await User.findByIdAndUpdate(req?.user?.userId, newUser);;

    if (req.file && updatedUser?.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(updatedUser?.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({ msg: "update user" });
};