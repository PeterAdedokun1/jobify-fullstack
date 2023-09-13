import { Router } from 'express';
const router = Router();

import { getCurrentUser, getApplicationStats, updateUser } from "../controllers/userController";
import { validateUpdateUserInput } from '../middleware/ValidationMiddleWare';
import { authorizePermissions, checkForTestUser } from '../middleware/AuthMiddleWare';
import upload from '../middleware/multerMiddleWare';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', authorizePermissions("admin"), getApplicationStats);
router.patch('/update-user', upload.single("avatar"),checkForTestUser,  validateUpdateUserInput, updateUser);

export default router