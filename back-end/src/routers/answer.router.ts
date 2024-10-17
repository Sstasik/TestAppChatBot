import { Router } from 'express';
import {AnswerController} from '../controllers';

import authMiddleware from "../middlwares/guards/auth.guard"
import adminMiddleware from "../middlwares/guards/admin.guard";
import companyAdminMiddleware from "../middlwares/guards/companyAdmin.guard";


const answerRouter = Router();

answerRouter.post('/byCompany/:companyId', authMiddleware, AnswerController.create);

answerRouter.get('/AllByCompany/:companyId', authMiddleware, adminMiddleware, companyAdminMiddleware, AnswerController.getAll);

answerRouter.get('/:id', authMiddleware, AnswerController.getById);

answerRouter.patch('/byCompany/:companyId', authMiddleware, AnswerController.updateOrCreate);

answerRouter.patch('/addAnswer/:companyId', authMiddleware, AnswerController.addAnswerToArray);

answerRouter.patch('/cleanAnswers/:companyId', authMiddleware, AnswerController.cleanAnswers);

answerRouter.get('/byCompany/:companyId', authMiddleware,  AnswerController.getByUserAndCompany);

answerRouter.patch('/:id',authMiddleware, AnswerController.update);

answerRouter.delete('/:id', authMiddleware, AnswerController.delete);

export default answerRouter;