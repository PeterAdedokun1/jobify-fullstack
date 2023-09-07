import { Router } from "express";
const router = Router()
import { register, login } from "../controllers/AuthController";
import { validateRegisterInput } from "../middleware/ValidationMiddleWare";

router.post("/register", validateRegisterInput, register);
router.post("/login", login);

export default router