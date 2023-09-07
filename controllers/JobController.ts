import Job from "../models/JobMode"
import { Request, Response } from "express"
import {StatusCodes} from "http-status-codes"
export const createJob = async (req: Request, res: Response) => {
    const { company, position } = req.body
    const jobs = await Job.create({ company, position })
    res.status(StatusCodes.CREATED).json({ jobs })
}
export const getAllJobs = async (req: Request, res: Response) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs })
}
export const getJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` })
    }
    return res.status(StatusCodes.OK).json({ job })
}
export const deleteJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id);
    if (!removeJob) {
        return res.status(404).json({ msg: `no job with id ${id}` })
    }
    res.status(StatusCodes.OK).json({ msg: "job deleted", removeJob })
}
export const UpdateJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true
    })
    if (!updatedJob) {
        return res.status(404).json({ msg: `no job with id ${id}` })
    }
    return res.status(StatusCodes.OK).json({job: updatedJob})
}