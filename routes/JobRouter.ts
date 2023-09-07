import { Router } from "express";
const router = Router();
import { createJob } from "../controllers/JobController";
import { getAllJobs } from "../controllers/JobController";

router.route("/").post(createJob).get(getAllJobs)

export default router