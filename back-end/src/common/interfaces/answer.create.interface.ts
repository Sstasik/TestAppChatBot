import {Types} from "mongoose";
import { Edges} from "./question.interface";

export interface AnswerCreateInterface{
	company: Types.ObjectId | string,
	user: Types.ObjectId | string,
	answers: Edges[]
}