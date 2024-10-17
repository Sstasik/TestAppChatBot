import {NextFunction, Request, Response} from 'express';
import { UserService } from "../services"

class UserController{
	async getAll(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const users = await UserService.getAll()
			res.status(200).json(users)
		}catch (e) {
			next(e)
		}
	}

	async getById(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const id = req.params.id
			const user = await UserService.getById(id)
			res.status(200).json(user)
		}catch (e) {
			next(e)
		}
	}

	async setUserPremiumAccount(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const id = req.params.id
			const user = await UserService.setUserPremiumAccount(id)
			res.status(200).json(user)
		}catch (e) {
			next(e)
		}
	}

	async setUserNotPremiumAccount(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const id = req.params.id
			const user = await UserService.setUserNotPremiumAccount(id)
			res.status(200).json(user)
		}catch (e) {
			next(e)
		}
	}

	async changeRole(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const id = req.params.id
			const { role } = req.body
			const user = await UserService.changeRole(id, role)
			res.status(200).json(user)
		}catch (e) {
			next(e)
		}
	}
}

export default new UserController()