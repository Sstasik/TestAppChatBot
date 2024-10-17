import { Schema, model } from "mongoose"
import {AnswerInterface} from "../common/interfaces/modelInterfaces/answer.interface";


const AnswerSchema = new Schema<AnswerInterface>({
	answers: [{ type: Object }],
	company: {type: Schema.Types.ObjectId, ref: 'companies'},
	user: {type: Schema.Types.ObjectId, ref: 'users'}
});

const AnswerModel = model('answers', AnswerSchema)

export default AnswerModel;