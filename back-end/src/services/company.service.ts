import {CompanyRepository} from "../repositories"
import {CompanyCreateInterface} from "../common/interfaces/company.create.interface";
import {Types} from "mongoose";
import {CompanyInterface} from "../common/interfaces/modelInterfaces/company.interface";
import {DeleteCompanyResponse} from "../common/interfaces/responses.interface";

class CompanyService{
	async create(company: CompanyCreateInterface):Promise<CompanyInterface>{
		return CompanyRepository.create(company)
	}

	async getAll():Promise<CompanyInterface[]>{
		return CompanyRepository.getAll()
	}

	async getAllByUser(userId: string | Types.ObjectId):Promise<CompanyInterface[]>{
		return CompanyRepository.getAllByUser(userId)
	}

	async getById(id: Types.ObjectId | string):Promise<CompanyInterface>{
		return CompanyRepository.getById(id)
	}

	async update(id: Types.ObjectId | string, data: Partial<CompanyCreateInterface>):Promise<CompanyInterface>{
		return CompanyRepository.update(id, data)
	}

	async deleteCompany(id: Types.ObjectId | string):Promise<DeleteCompanyResponse>{
		return CompanyRepository.deleteCompany(id)
	}

}

export default new CompanyService()