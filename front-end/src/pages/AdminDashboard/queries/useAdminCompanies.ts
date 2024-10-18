import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthSession } from "@/providers/AuthProvider";

import { api } from "@/api";
import { User } from "@/entities/User";

export const useAdminCompanies = () => {
  const { user } = useAuthSession();
  const select = useCallback((data: User) => {
    return data.companies;
  }, []);

  return useQuery({
    queryKey: ["admin", "companies"],
    queryFn: () => api.user.getUserById(user!._id),
    select: select,
    enabled: !!user?._id,
  });
};
