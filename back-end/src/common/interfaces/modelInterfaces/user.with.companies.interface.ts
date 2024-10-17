import {Types} from "mongoose";
import {RoleEnum} from "../../enums/role.enum";
import {CompanyInterface} from "./company.interface";

export interface UserWithCompaniesInterface extends Document {
	_id: Types.ObjectId;
	email: string;
	username: string;
	password: string;
	role: RoleEnum;
	isPremium: boolean;
	createdAt: Date;
	updatedAt: Date;
	companies: CompanyInterface[]
}