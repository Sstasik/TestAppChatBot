import {Types} from "mongoose";

export interface CompanyInterface extends Document{
	_id: Types.ObjectId;
	name: string;
	botTree: object | null;
	admin: Types.ObjectId;
}
