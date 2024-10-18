import axiosApi from "@/api/config/axios";
import { getError } from "@/api/config/getError";
import { Answer } from "@/entities/BotTree";

export type GetUserAnswersResponse = {
  _id: string;
  answers: Answer[];
  company: string;
  user: string;
};

async function getUserAnswers(companyId: string) {
  try {
    const response = await axiosApi.get<GetUserAnswersResponse>(
      `/answers/byCompany/${companyId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

async function addAnswer(companyId: string, body: Answer) {
  try {
    const response = await axiosApi.patch(
      `/answers/addAnswer/${companyId}`,
      body
    );
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

async function cleanAnswers(companyId: string) {
  try {
    const response = await axiosApi.patch(`/answers/cleanAnswers/${companyId}`);
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export const answersApi = {
  getUserAnswers,
  addAnswer,
  cleanAnswers,
};
