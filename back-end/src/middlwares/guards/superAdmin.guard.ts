import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {RoleEnum} from "../../common/enums/role.enum";
import {UserPayload} from "../../common/interfaces/user.payload.interface";
import {HttpException} from "../errror-handling/httpException";

const superAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		const error: HttpException = new HttpException(401, 'No token provided, authorization denied');
		return next(error);
	}

	jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
		if (err || !decoded) {
			const error: HttpException = new HttpException(401,'Token is not valid');
			return next(error);
		}

		const user = decoded as UserPayload;

		if (user.role !== RoleEnum.SUPER_ADMIN) {
			const error: HttpException = new HttpException(403,'Permission denied');
			return next(error);
		}
		req.user = user
		next();
	});
};

export default superAdminMiddleware;