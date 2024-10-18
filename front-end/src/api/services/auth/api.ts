import { AxiosResponse } from "axios";

import { User } from "@/entities/User";

import axiosApi from "../../config/axios";
import { getError } from "../../config/getError";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

async function login(payload: LoginPayload) {
  try {
    const response = await axiosApi.post<
      LoginPayload,
      AxiosResponse<LoginResponse>
    >("/auth/login", payload);
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export type RegisterPayload = {
  email: string;
  password: string;
  username: string;
};

export type RegisterResponse = {
  user: User;
  token: string;
};

async function registration(payload: RegisterPayload) {
  try {
    const response = await axiosApi.post<
      LoginPayload,
      AxiosResponse<RegisterResponse>
    >("/auth/registration", payload);
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export const authApi = {
  login,
  registration,
};
