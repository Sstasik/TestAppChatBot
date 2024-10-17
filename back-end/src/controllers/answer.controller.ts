import { Request, Response, NextFunction } from 'express';
import AnswerService from '../services/answer.service';

class AnswerController {
	async create(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const body = req.body;
			const userId = req.user.id
			const companyId = req.params.companyId
			const answer = await AnswerService.createAnswer({...body, user: userId, company: companyId});
			res.status(201).json(answer);
		} catch (e) {
			next(e);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const companyId = req.params.companyId
			const answers = await AnswerService.getAllAnswers(companyId);
			res.status(200).json(answers);
		} catch (e) {
			next(e);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const id = req.params.id;
			const answer = await AnswerService.getAnswerById(id);
			res.status(200).json(answer);
		} catch (e) {
			next(e);
		}
	}

	async update(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const id = req.params.id;
			const updateData = req.body;
			const updatedAnswer = await AnswerService.updateAnswer(id, updateData);
			res.status(200).json(updatedAnswer);
		} catch (e) {
			next(e);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const id = req.params.id;
			const deleteResult = await AnswerService.deleteAnswer(id);
			res.status(200).json(deleteResult);
		} catch (e) {
			next(e);
		}
	}

	async updateOrCreate(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const {companyId } = req.params;
			const data = req.body;
			const answer = await AnswerService.updateOrCreateAnswer(req.user.id, companyId, data);
			res.status(200).json(answer);
		} catch (e) {
			next(e);
		}
	}

	async getByUserAndCompany(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const { companyId } = req.params;
			const answer = await AnswerService.getAnswerByUserAndCompany(req.user.id, companyId);
			res.status(200).json(answer);
		} catch (e) {
			next(e);
		}
	}

	async addAnswerToArray(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const { companyId } = req.params;
			const { body } = req
			const answer = await AnswerService.addAnswerToArray(req.user.id, companyId, body);
			res.status(200).json(answer);
		} catch (e) {
			next(e);
		}
	}

	async cleanAnswers(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const { companyId } = req.params;
			const answer = await AnswerService.cleanAnswers(req.user.id, companyId);
			res.status(200).json(answer);
		} catch (e) {
			next(e);
		}
	}
}

export default new AnswerController();
