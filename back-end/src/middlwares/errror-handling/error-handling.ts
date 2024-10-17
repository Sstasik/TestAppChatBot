import { Request, Response, NextFunction } from 'express';
import {HttpException} from "./httpException";


const errorMiddleware = (err:  HttpException, req: Request, res: Response, next: NextFunction): void => {
	const statusCode = err?.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		success: false,
		message
	});
};

export default errorMiddleware;
