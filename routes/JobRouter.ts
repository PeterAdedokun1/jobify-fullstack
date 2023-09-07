import { Router } from "express";
const router = Router();
import { createJob } from "../controllers/JobController";

router.route("/").post(createJob)

export default router