import {HttpException} from "./httpException";


export function handleServiceError(e: HttpException | unknown): never{
	if (e instanceof HttpException) {
		throw new HttpException(e.status, e.message);
	} else {
		throw new HttpException(500, 'Internal Server Error');
	}
}