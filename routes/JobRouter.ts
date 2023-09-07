import { Router } from "express";
const router = Router();
import { UpdateJob, createJob, getAllJobs, getJob,deleteJob } from "../controllers/JobController";
router.route("/").post(createJob).get(getAllJobs)
router.route("/:id").get(getJob).delete(deleteJob).patch(UpdateJob)

export default router