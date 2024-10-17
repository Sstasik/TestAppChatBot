import { Document, Types } from "mongoose";
import { Edges } from "../question.interface";

export interface AnswerInterface extends Document {
	_id: Types.ObjectId;
	answers: Edges[];
	company: Types.ObjectId;
	user: Types.ObjectId;
}