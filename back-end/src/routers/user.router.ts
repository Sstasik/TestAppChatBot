import { Router } from 'express';

import { UserController } from "../controllers"

import authMiddleware from "../middlwares/guards/auth.guard"
import superAdminMiddleware from "../middlwares/guards/superAdmin.guard"

const userRouter: Router = Router();

userRouter.get('/', authMiddleware, superAdminMiddleware, UserController.getAll)

userRouter.get('/:id', authMiddleware, UserController.getById)

userRouter.get('setPremium/:id', authMiddleware, superAdminMiddleware, UserController.setUserPremiumAccount)

userRouter.get('setPremium/:id', authMiddleware, superAdminMiddleware, UserController.setUserNotPremiumAccount)

userRouter.patch('/changeRole/:id', authMiddleware, superAdminMiddleware, UserController.changeRole)

export default userRouter;