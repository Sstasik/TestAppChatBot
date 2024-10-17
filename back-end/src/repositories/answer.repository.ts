import { AnswerModel } from "../models";
import { AnswerCreateInterface} from "../common/interfaces/answer.create.interface";
import {Types} from "mongoose";
import {AnswerInterface} from "../common/interfaces/modelInterfaces/answer.interface";
import {DeleteAnswerResponse} from "../common/interfaces/responses.interface";
import {handleServiceError} from "../middlwares/errror-handling/throwException";
import {HttpException} from "../middlwares/errror-handling/httpException";
import {Edges} from "../common/interfaces/question.interface";


class AnswerRepository{
	async create(data: AnswerCreateInterface):Promise<AnswerInterface>{
		try {
			return AnswerModel.create(data)
		}catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async getAll(companyId: string | Types.ObjectId):Promise<AnswerInterface[]>{
		try {
			return AnswerModel.find({
				company: companyId
			})
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async getById(id: Types.ObjectId | string):Promise<AnswerInterface>{
		try {
			const answer = await AnswerModel.findById(id);
			if (!answer) {
				throw new HttpException(404,'Answer not found');
			}
			return answer;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async update(id: string | Types.ObjectId, data: Partial<AnswerCreateInterface>):Promise<AnswerInterface> {
		try {
			const answer = await AnswerModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
			if (!answer) {
				throw new HttpException(404, `Company with id ${id} not found`);
			}
			return answer;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async deleteAnswer(id: string | Types.ObjectId):Promise<DeleteAnswerResponse> {
		try {
			const result = await AnswerModel.findByIdAndDelete(id);
			if (!result) {
				throw new HttpException(404,`Answer with id ${id} not found`);
			}
			return { message: 'Answer successfully deleted', result };
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async updateOrCreate(userId: string | Types.ObjectId,  companyId: string | Types.ObjectId, data: AnswerCreateInterface):Promise<AnswerInterface> {
		try {
			const answer = await AnswerModel.findOneAndUpdate(
				{ user: userId, company: companyId },
				data,
				{ new: true, upsert: true, runValidators: true }
			);

			return answer;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async getByUserAndCompany(userId: string | Types.ObjectId,  companyId: string | Types.ObjectId):Promise<AnswerInterface | null>{
		try {
			const answer = await AnswerModel.findOne({user: userId, company: companyId})
			return answer
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async addAnswerToArray(
		userId: string | Types.ObjectId,
		companyId: string | Types.ObjectId,
		data: Edges):Promise<AnswerInterface> {
		try {
			const answer = await AnswerModel.findOneAndUpdate(
				{ user: userId, company: companyId },
				{ $push: { answers: data } },
				{ new: true, upsert: true, runValidators: true }
			);

			return answer;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async cleanAnswers(
		userId: string | Types.ObjectId,
		companyId: string | Types.ObjectId,
	):Promise<AnswerInterface>{
		try {
			const answer = await AnswerModel.findOneAndUpdate(
				{ user: userId, company: companyId },
				{ $set: { answers: [] } },
				{ new: true, upsert: true, runValidators: true }
			);
			return answer
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}
}

export default new AnswerRepository()