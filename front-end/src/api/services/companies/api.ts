import { AxiosResponse } from "axios";

import axiosApi from "@/api/config/axios";
import { getError } from "@/api/config/getError";

import { Question } from "@/entities/BotTree";
import { Company } from "@/entities/Company";

export type CreateCompanyPayload = {
  name: string;
  botTree?: Question;
};

export type CreateCompanyResponse = {
  name: string;
  botTree?: Question;
};

async function createCompany(payload: CreateCompanyPayload) {
  try {
    const response = await axiosApi.post<
      CreateCompanyPayload,
      AxiosResponse<Company>
    >("/companies", payload);
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

async function getAllCompanies() {
  try {
    const response = await axiosApi.get<Company[]>("/companies");
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

async function getCompanyById(id: string) {
  try {
    const response = await axiosApi.get<Company>(`/companies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

async function updateCompany(id: string, payload: Partial<Company>) {
  try {
    const response = await axiosApi.patch<Company, AxiosResponse<Company>>(
      `/companies/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

async function deleteCompany(id: string) {
  try {
    const response = await axiosApi.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export const companiesApi = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
