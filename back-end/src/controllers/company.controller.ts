import {NextFunction, Request, Response} from 'express';
import { CompanyService } from "../services"

class CompanyController{

	async create(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const body = req.body
			const company = await CompanyService.create({...body, admin: req.user?.id})
			res.status(200).json(company)
		}catch (e) {
			next(e)
		}
	}
	async getAll(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const companies = await CompanyService.getAll()
			res.status(200).json(companies)
		}catch (e) {
			next(e)
		}
	}

	async getById(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const id = req.params.id
			const company = await CompanyService.getById(id)
			res.status(200).json(company)
		}catch (e) {
			next(e)
		}
	}

	async update(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const id = req.params.id;
			const updateData = req.body;
			const updatedCompany = await CompanyService.update(id, updateData);
			res.status(200).json(updatedCompany);
		} catch (e) {
			next(e);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction):Promise<void> {
		try {
			const id = req.params.id;
			const deleteResult = await CompanyService.deleteCompany(id);
			res.status(200).json(deleteResult);
		} catch (e) {
			next(e);
		}
	}
}

export default new CompanyController()