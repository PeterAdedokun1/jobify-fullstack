import { Router } from "express";
const router = Router();
import { UpdateJob, createJob, getAllJobs, getJob, deleteJob } from "../controllers/JobController";
import { validateIdParams, validateJobInput } from "../middleware/ValidationMiddleWare";
router.route("/").post(validateJobInput, createJob).get(getAllJobs)
router.route("/:id").get(validateIdParams,validateIdParams, getJob).delete(validateIdParams, deleteJob).patch(validateJobInput, UpdateJob)

export default router