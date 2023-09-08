import Job from "../models/JobModel"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/CustomError"
export const createJob = async (req: Request, res: Response) => {
    req.body.createdBy = req.user?.userId
    const jobs = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ jobs })
}
export const getAllJobs = async (req: Request, res: Response) => {
    console.log(req.user)
    const jobs = await Job.find({createdBy: req.user?.userId});
    res.status(StatusCodes.OK).json({ jobs })
}
export const getJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    res.status(StatusCodes.OK).json({ job })
}
export const deleteJob = async (req: Request, res: Response) => {
    const removeJob = await Job.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json({ msg: "job deleted", removeJob })
}
export const UpdateJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true
    })

    return res.status(StatusCodes.OK).json({ job: updatedJob })
}