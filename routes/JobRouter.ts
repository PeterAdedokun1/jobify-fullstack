import { Router } from "express";
const JobRouter = Router();
import { UpdateJob, createJob, getAllJobs, getJob, deleteJob } from "../controllers/JobController";
import { validateIdParams, validateJobInput } from "../middleware/ValidationMiddleWare";
import { checkForTestUser } from "../middleware/AuthMiddleWare";
JobRouter.route("/").post(checkForTestUser,validateJobInput, createJob).get(getAllJobs)
JobRouter.route("/:id").get(validateIdParams, validateIdParams, getJob).delete(checkForTestUser, validateIdParams, deleteJob).patch(checkForTestUser,validateJobInput, UpdateJob)

export default JobRouter