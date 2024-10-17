import { UserModel } from "../models/index";
import {UserCreateInterface} from "../common/interfaces/user.create.interface";
import {Types} from "mongoose";
import {UserInterface} from "../common/interfaces/modelInterfaces/user.interface";
import {RoleEnum} from "../common/enums/role.enum";
import {HttpException} from "../middlwares/errror-handling/httpException";
import {handleServiceError} from "../middlwares/errror-handling/throwException";
import {UserWithCompaniesInterface} from "../common/interfaces/modelInterfaces/user.with.companies.interface";


class UserRepository{
	async create(user: UserCreateInterface):Promise<UserInterface>{
		try {
			return UserModel.create(user)
		}catch (e: HttpException | unknown){
			throw new HttpException(500, `Server error: ${e}`)
		}
	}

	async getAll():Promise<UserInterface[]>{
    return UserModel.find()
	}

	async getById(userId: Types.ObjectId | string){
		try {
			const user = await UserModel.findById(userId);
			if (!user) {
				throw new HttpException(404,'User not found');
			}
			return user;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async getUserWithCompanies(userId: Types.ObjectId | string):Promise<UserWithCompaniesInterface> {
		try {
			const result = await UserModel.aggregate([

				{
					$match: { _id: new Types.ObjectId(userId) }
				},

				{
					$lookup: {
						from: 'companies',
						localField: '_id',
						foreignField: 'admin',
						as: 'companies'
					}
				},
				{
					$project: {
						_id: 1,
						email: 1,
						username: 1,
						role: 1,
						isPremium: 1,
						createdAt: 1,
						companies: 1
					}
				}
			]);

			if (!result || result.length === 0) {
				throw new HttpException(404, 'User not found');
			}

			return result[0];
		} catch (e: HttpException | unknown) {
			handleServiceError(e);
		}
	}

	async getByEmail(email: string):Promise<UserInterface | null> {
		const user = await UserModel.findOne({email}).select('+password');
		return user;
	}


	async setUserPremiumAccount(id: string | Types.ObjectId):Promise<UserInterface> {
		try {
			const user = await this.getById(id)
			user.isPremium = true;
			await user.save();
			return user;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async setUserNotPremiumAccount(id: string | Types.ObjectId):Promise<UserInterface>{
		try {
			const user = await this.getById(id);
			user.isPremium = false;
			await user.save();
			return user;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async changeRole(id: string | Types.ObjectId, role: RoleEnum): Promise<UserInterface>{
		try {
			const user = await UserModel.findByIdAndUpdate(
				id,
				{ role },
				{ new: true, runValidators: true }
			);

			if (!user) {
				throw new HttpException(404, `User with id ${id} not found`);
			}

			return user;
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}
}


export default new UserRepository()