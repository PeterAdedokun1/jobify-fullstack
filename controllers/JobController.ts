import Job from "../models/JobModel"
import { Request, Response, } from "express"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/CustomError"
interface IQueryObject {
    $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
    jobStatus?: string;
    jobType?: string;
}
interface QueryParams {
    search?: string;
    jobStatus?: string;
    jobType?: string;
    sort?: string;
    // Add other query parameters as needed
}

const queryObject: IQueryObject = {};

export const getAllJobs = async (req: Request, res: Response) => {
    console.log(req.user)
    // const { search, jobStatus, jobType, sort } = req.query;
    const { search, jobStatus, jobType, sort } = req.query as QueryParams;

    const queryObject = {
        createdBy: req.user?.userId,
    };


    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
        ];
    }

    if (jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus  = jobStatus;
    }

    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }
    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position',
    };

    const sortKey = sortOptions[sort] || sortOptions.newest 
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalJobs = await Job.countDocuments(queryObject);
    const jobs = await Job.find(queryObject)
        .sort(sortKey)
        .skip(skip)
        .limit(limit);
    const numOfPages = Math.ceil(totalJobs / limit);




    // const jobs = await Job.find({ createdBy: req.user?.userId });
    res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage: page, jobs })
}
export const createJob = async (req: Request, res: Response) => {
    req.body.createdBy = req.user?.userId

    const jobs = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ jobs })
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