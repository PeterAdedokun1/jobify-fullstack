import { Router } from 'express';
const router = Router();

import { getCurrentUser, getApplicationStats, updateUser } from "../controllers/userController";
import { validateUpdateUserInput } from '../middleware/ValidationMiddleWare';
import { authorizePermissions } from '../middleware/AuthMiddleWare';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', authorizePermissions("admin"), getApplicationStats);
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router