import { Request, Response, NextFunction } from 'express';
import { UserService } from "../../services"
import {UserPayload} from "../../common/interfaces/user.payload.interface";
import {HttpException} from "../errror-handling/httpException";

const premiumAccountMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const userPayload = req.user as UserPayload;
	const user = await UserService.getById(userPayload.id)
	if (!user.isPremium) {
		const error: HttpException = new HttpException(403, 'Permission denied. You have not premium account');
		return next(error);
	}
	next();
};

export default premiumAccountMiddleware;