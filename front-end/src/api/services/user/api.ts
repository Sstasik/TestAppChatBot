import axiosApi from "@/api/config/axios";
import { getError } from "@/api/config/getError";
import { User } from "@/entities/User";

async function getUserById(id: string) {
  try {
    const response = await axiosApi.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export const userApi = {
  getUserById,
};
