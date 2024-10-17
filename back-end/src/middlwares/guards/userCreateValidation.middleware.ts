import {UserCreateSchema} from "../../common/validation/user.validation";
import {HttpException} from "../errror-handling/httpException";
import {UserService} from "../../services";
import {NextFunction, Request, Response} from "express";


const userCreateValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const data  = req.body
	const { error } = UserCreateSchema.validate(data);
	if (error) {
		const e: HttpException = new HttpException(400, error.details[0].message);
		return next(e)
	}
	const existingUser = await UserService.getByEmail(data.email)
	if (existingUser) {
		const e: HttpException = new HttpException(400,'User with this email already exists');
		return next(e)
	}
	next();
}

export default userCreateValidationMiddleware;