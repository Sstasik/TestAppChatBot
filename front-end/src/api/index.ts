import { answersApi } from "./services/answers/api";
import { authApi } from "./services/auth/api";
import { companiesApi } from "./services/companies/api";
import { userApi } from "./services/user/api";

export const api = {
  auth: authApi,
  companies: companiesApi,
  user: userApi,
  answers: answersApi,
};
