import { Router } from "express";
const JobRouter = Router();
import { UpdateJob, createJob, getAllJobs, getJob, deleteJob } from "../controllers/JobController";
import { validateIdParams, validateJobInput } from "../middleware/ValidationMiddleWare";
JobRouter.route("/").post(validateJobInput, createJob).get(getAllJobs)
JobRouter.route("/:id").get(validateIdParams,validateIdParams, getJob).delete(validateIdParams, deleteJob).patch(validateJobInput, UpdateJob)

export default JobRouter