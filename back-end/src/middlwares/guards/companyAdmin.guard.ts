import { Request, Response, NextFunction } from 'express';
import { CompanyService } from "../../services"
import {UserPayload} from "../../common/interfaces/user.payload.interface";
import {HttpException} from "../errror-handling/httpException";

const companyAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
		const user = req.user as UserPayload;
		const companyId = req.params.id || req.params.companyId
		const company = await CompanyService.getById(companyId)
		if (user.id != company.admin) {
			const error: HttpException = new HttpException(403, 'Permission denied. You are not admin of this company');;
			return next(error);
		}
		next();
};

export default companyAdminMiddleware;