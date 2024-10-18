import { Company } from "./Company";

export type User = {
  _id: string;
  email: string;
  username: string;
  role: "admin" | "superAdmin" | "user";
  isPremium: boolean;
  companies: Company[];
};
