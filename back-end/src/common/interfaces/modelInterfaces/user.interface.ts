import {Types} from "mongoose";
import {RoleEnum} from "../../enums/role.enum";

export interface UserInterface extends Document {
	_id: Types.ObjectId;
	email: string;
	username: string;
	password: string;
	role: RoleEnum;
	isPremium: boolean;
	createdAt: Date;
	updatedAt: Date;
}
