import {NextFunction, Request, Response} from 'express';
import { AuthService } from "../services"

class AuthController{
	async register(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const user = await AuthService.register(req.body)
			res.status(201).json(user)
		}catch (e) {
			next(e)
		}
	}

	async login(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const {email, password} = req.body
			const user = await AuthService.login(email, password)
			res.status(200).json(user)
		}catch (e) {
			next(e)
		}
	}
}

export default new AuthController()