import axios from "axios";
import {HttpException} from "../middlwares/errror-handling/httpException";

export class ChatService{
	async sendMessage(userInput: string){
		try {
			const response = await axios.post(
				`${process.env.AI_MODEL}`,
				{ inputs: `Generate a business response: ${userInput}` },
				{
					headers: {
						Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
						'Content-Type': 'application/json',
					},
				}
			);
			return response.data
		} catch (e: unknown | HttpException) {
			throw new HttpException(500, `Failed to get a response from the API: ${e}`)
		}
	}
}

export default new ChatService();