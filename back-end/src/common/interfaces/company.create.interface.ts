import {Types} from "mongoose";
import { BotTree } from "./question.interface";


export interface CompanyCreateInterface{
	name: string,
	admin: Types.ObjectId | string,
	botTree?: BotTree
}