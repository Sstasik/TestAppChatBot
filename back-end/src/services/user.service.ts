import {UserRepository} from "../repositories"
import {UserCreateInterface} from "../common/interfaces/user.create.interface";
import {Types} from "mongoose";
import {UserInterface} from "../common/interfaces/modelInterfaces/user.interface";
import {RoleEnum} from "../common/enums/role.enum";
import {UserWithCompaniesInterface} from "../common/interfaces/modelInterfaces/user.with.companies.interface";

class UserService{
	async create(user: UserCreateInterface):Promise<UserInterface>{
		return UserRepository.create(user)
	}

	async getAll():Promise<UserInterface[]>{
		return UserRepository.getAll()
	}

	async getById(id: Types.ObjectId | string):Promise<UserWithCompaniesInterface>{
		return UserRepository.getUserWithCompanies(id)
	}

	async getByEmail(email: string):Promise<UserInterface | null>{
		return UserRepository.getByEmail(email)
	}

	async setUserPremiumAccount(id: Types.ObjectId | string):Promise<UserInterface>{
		return UserRepository.setUserPremiumAccount(id)
	}

	async setUserNotPremiumAccount(id: Types.ObjectId | string):Promise<UserInterface>{
		return UserRepository.setUserNotPremiumAccount(id)
	}

	async changeRole(id: string | Types.ObjectId, role: RoleEnum){
		return UserRepository.changeRole(id, role)
	}
}

export default new UserService()