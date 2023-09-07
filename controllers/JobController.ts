import Job from "../models/JobMode"
import { Request, Response } from "express"

export const createJob = async (req: Request, res: Response) => {
    const { company, position } = req.body
    const jobs = await Job.create({ company, position })
    res.status(201).json({ jobs })
}
export const getAllJobs = async (req: Request, res:Response) => {
    const jobs = await Job.find({});
    res.status(200).json({jobs})
}

