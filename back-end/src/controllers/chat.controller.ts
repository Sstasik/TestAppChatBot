import {NextFunction, Request, Response} from 'express';
import ChatService  from "../services/chat.service"

class ChatController{
	async sendMessage(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const response = await ChatService.sendMessage(req.body.message)
			res.status(200).json(response)
		}catch (e) {
			next(e)
		}
	}
}

export default new ChatController()