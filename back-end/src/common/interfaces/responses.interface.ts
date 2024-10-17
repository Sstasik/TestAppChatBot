import {CompanyInterface} from "./modelInterfaces/company.interface";
import {AnswerInterface} from "./modelInterfaces/answer.interface";
import {RoleEnum} from "../enums/role.enum";
import {Types} from "mongoose";

export interface DeleteCompanyResponse {
	message: string;
	result: CompanyInterface | null;
}

export interface DeleteAnswerResponse {
	message: string;
	result: AnswerInterface | null;
}

export interface UserAuthResponse{
	user: {
		_id: string | Types.ObjectId,
		username: string,
		role: RoleEnum,
		isPremium: boolean,
		companies: CompanyInterface[]
	},
	token: string,
}