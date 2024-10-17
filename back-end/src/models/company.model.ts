import { Schema, model } from "mongoose"
import {CompanyInterface} from "../common/interfaces/modelInterfaces/company.interface";


const CompanySchema = new Schema<CompanyInterface>({
	name: {type: String},
	botTree: {type: Object, default: null},
	admin: {type: Schema.Types.ObjectId, ref: 'users'}
});

const CompanyModel = model('companies', CompanySchema)

export default CompanyModel;
