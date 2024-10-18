import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSelectedCompany = (id: string | null) => {
  return useQuery({
    queryKey: ["admin", "company", id],
    queryFn: () => api.companies.getCompanyById(id!),
    enabled: !!id,
    staleTime: 5 * 6 * 1000,
  });
};
