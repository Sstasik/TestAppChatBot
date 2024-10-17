import { Router } from 'express';

import { AuthController } from "../controllers"
import userCreateValidationMiddleware from "../middlwares/guards/userCreateValidation.middleware";

const authRouter: Router = Router();

authRouter.post('/registration', userCreateValidationMiddleware, AuthController.register)

authRouter.post('/login', AuthController.login)

export default authRouter;