import { AxiosError } from "axios";

export const getError = (e: unknown) => {
  const error = e as Error | AxiosError;
  if (error instanceof AxiosError) {
    if (error.response?.data.type === "unable_to_join") {
      return error.response?.data.message;
    }

    return "Something went wrong :(";
  }
  return error.message;
};
