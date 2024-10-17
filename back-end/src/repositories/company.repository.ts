import { CompanyModel } from "../models";
import {CompanyCreateInterface} from "../common/interfaces/company.create.interface";
import {Types} from "mongoose";
import { DeleteCompanyResponse} from "../common/interfaces/responses.interface";
import {CompanyInterface} from "../common/interfaces/modelInterfaces/company.interface";
import {handleServiceError} from "../middlwares/errror-handling/throwException";
import {HttpException} from "../middlwares/errror-handling/httpException";


class CompanyRepository{
	async create(data: CompanyCreateInterface):Promise<CompanyInterface>{
		try {
			return CompanyModel.create(data)
		}catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async getAll():Promise<CompanyInterface[]>{
		return CompanyModel.find()
	}

	async getAllByUser(userId: string | Types.ObjectId):Promise<CompanyInterface[]>{
		try {
			return CompanyModel.find({
				admin: userId
			})
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async getById(id: Types.ObjectId | string):Promise<CompanyInterface>{
		try {
			const company = await CompanyModel.findById(id);
			if (!company) {
				throw new HttpException(404, 'Company not found');
			}
			return company;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async update(id: string | Types.ObjectId, data: Partial<CompanyCreateInterface>):Promise<CompanyInterface> {
		try {
			const company = await CompanyModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
			if (!company) {
				throw new HttpException(404, `Company with id ${id} not found`);
			}
			return company;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async deleteCompany(id: string | Types.ObjectId):Promise<DeleteCompanyResponse> {
		try {
			const result = await CompanyModel.findByIdAndDelete(id);
			if (!result) {
				throw new HttpException(404, `Company with id ${id} not found`);
			}
			return { message: 'Company successfully deleted', result };
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}
}

export default new CompanyRepository()