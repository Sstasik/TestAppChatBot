import { Router } from 'express';

import  {ChatController} from "../controllers"
import authMiddleware from "../middlwares/guards/auth.guard";
import premiumAccountMiddleware from "../middlwares/guards/premiumAccount.guard";

const chatRouter: Router = Router();

chatRouter.post('/', authMiddleware, premiumAccountMiddleware, ChatController.sendMessage)

export default chatRouter;