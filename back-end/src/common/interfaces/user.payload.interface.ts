import {Types} from "mongoose";
import {RoleEnum} from "../enums/role.enum";

export interface UserPayload {
	id: Types.ObjectId | string;
	role: RoleEnum;
}
