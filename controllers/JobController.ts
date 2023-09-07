import Job from "../models/JobMode"
import {Request, Response } from "express"

export const createJob = async (req: Request, res: Response) => {
    const {company, position } = req.body
    const jobs = await Job.create({ company, position })
    res.status(201).json({jobs})
}

