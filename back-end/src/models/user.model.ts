import { Schema, model } from "mongoose"
import bcrypt from 'bcrypt';

import {RoleEnum} from "../common/enums/role.enum";
import {UserInterface} from "../common/interfaces/modelInterfaces/user.interface";

const UserSchema = new Schema<UserInterface>({
	email: { type: String, unique: true, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true, select: false },
	role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER },
	isPremium: {type: Boolean, default: false},
	createdAt: { type: Date, default: new Date() },
	updatedAt: { type: Date, default: new Date() }
});


UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		console.log(error)
	}
});


UserSchema.pre("save", function (next) {
	this.updatedAt = new Date()
	next();
});
const UserModel = model('users', UserSchema)

export default UserModel;