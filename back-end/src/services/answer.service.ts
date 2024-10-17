import {AnswerCreateInterface} from "../common/interfaces/answer.create.interface";
import { AnswerRepository } from "../repositories"
import {Types} from "mongoose";
import {AnswerInterface} from "../common/interfaces/modelInterfaces/answer.interface";
import {DeleteAnswerResponse} from "../common/interfaces/responses.interface";
import {Edges} from "../common/interfaces/question.interface";

class AnswerService {
	async createAnswer(data: AnswerCreateInterface):Promise<AnswerInterface> {
		return AnswerRepository.create(data);
	}

	async getAllAnswers(companyId: string | Types.ObjectId):Promise<AnswerInterface[]> {
		return AnswerRepository.getAll(companyId);
	}

	async getAnswerById(id: string | Types.ObjectId):Promise<AnswerInterface> {
		return AnswerRepository.getById(id);
	}

	async updateOrCreateAnswer(
		userId: string | Types.ObjectId,
		companyId: string | Types.ObjectId,
		data: AnswerCreateInterface
	):Promise<AnswerInterface> {
		return AnswerRepository.updateOrCreate(userId, companyId, data);
	}

	async getAnswerByUserAndCompany(
		userId: string | Types.ObjectId,
		companyId: string | Types.ObjectId
	):Promise<AnswerInterface | null> {
		return AnswerRepository.getByUserAndCompany(userId, companyId);
	}


	async updateAnswer(id: string | Types.ObjectId, data: Partial<AnswerCreateInterface>):Promise<AnswerInterface> {
		return AnswerRepository.update(id, data);
	}

	async deleteAnswer(id: string | Types.ObjectId):Promise<DeleteAnswerResponse> {
		return AnswerRepository.deleteAnswer(id);
	}

	async addAnswerToArray(
		userId: string | Types.ObjectId,
		companyId: string | Types.ObjectId,
		data: Edges):Promise<AnswerInterface> {
    return AnswerRepository.addAnswerToArray(userId, companyId, data)
	}

	async cleanAnswers(
		userId: string | Types.ObjectId,
		companyId: string | Types.ObjectId)
		:Promise<AnswerInterface> {
		return AnswerRepository.cleanAnswers(userId, companyId)
	}
}

export default new AnswerService();