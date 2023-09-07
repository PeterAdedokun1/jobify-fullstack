import { Router } from "express";
const router = Router();
import { createJob } from "../controllers/JobController";
import { getAllJobs } from "../controllers/JobController";
import { getJob } from "../controllers/JobController";
import { deleteJob } from "../controllers/JobController";
router.route("/").post(createJob).get(getAllJobs)
router.route("/:id").get(getJob).delete(deleteJob)

export default router