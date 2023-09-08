import { Router } from "express";
const router = Router()
import { register, login, logout } from "../controllers/AuthController";
import { validateRegisterInput } from "../middleware/ValidationMiddleWare";
import { validateLoginInput } from "../middleware/ValidationMiddleWare";
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout)

export default router