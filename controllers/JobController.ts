import Job from "../models/JobMode"
import { Request, Response } from "express"

export const createJob = async (req: Request, res: Response) => {
    const { company, position } = req.body
    const jobs = await Job.create({ company, position })
    res.status(201).json({ jobs })
}
export const getAllJobs = async (req: Request, res: Response) => {
    const jobs = await Job.find({});
    res.status(200).json({ jobs })
}
export const getJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` })
    }
    return res.status(200).json({ job })
}
export const deleteJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id);
    if (!removeJob) {
        return res.status(404).json({ msg: `no job with id ${id}` })
    }
    res.status(200).json({ msg: "job deleted", removeJob })
}
export const UpdateJob = async (req: Request, res: Response) => {

}