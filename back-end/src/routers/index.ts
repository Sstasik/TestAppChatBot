import {Router} from "express"

import authRouter from "./auth.router"
import userRouter from "./user.router";
import chatRouter from "./chat.router";
import companyRouter from "./company.router";
import answerRouter from "./answer.router";

const routers: Router = Router();

routers.use('/auth', authRouter)

routers.use('/users', userRouter)

routers.use('/chat', chatRouter)

routers.use('/companies', companyRouter)

routers.use('/answers', answerRouter)

export default routers