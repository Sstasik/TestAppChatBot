import {CompanyService, UserService} from './index';
import { UserCreateInterface } from '../common/interfaces/user.create.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Types} from "mongoose";
import {UserAuthResponse} from "../common/interfaces/responses.interface";
import {HttpException} from "../middlwares/errror-handling/httpException";
import {handleServiceError} from "../middlwares/errror-handling/throwException";

class AuthService {

	async register(data: UserCreateInterface):Promise<UserAuthResponse> {
		try {
      const newUser = await UserService.create(data)
			const token = this.generateToken(newUser._id, newUser.role);

			return {
				user: {
					_id: newUser._id,
					username: newUser.username,
					role: newUser.role,
					isPremium: newUser.isPremium,
					companies: []
				},
				token,
			};
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	async login(email: string, password: string):Promise<UserAuthResponse> {
		try {
			const user = await UserService.getByEmail(email)
			if (!user) {
				throw new HttpException(400,'Invalid email or password');
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				throw new HttpException(400, 'Invalid email or password');
			}

			const token = this.generateToken(user._id, user.role);

			const companies = await CompanyService.getAllByUser(user._id)
			return {
				user: {
					_id: user._id,
					username: user.username,
					role: user.role,
					isPremium: user.isPremium,
					companies: companies
				},
				token,
			};
		} catch (e: HttpException | unknown) {
			handleServiceError(e)
		}
	}

	private generateToken(userId: Types.ObjectId, role: string): string {
		const secret = process.env.JWT_SECRET || 'your_jwt_secret';
		const token = jwt.sign({ id: userId, role }, secret, {
			expiresIn: '6h',
		});
		return token;
	}
}

export default new AuthService();
