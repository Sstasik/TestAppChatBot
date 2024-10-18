import { cn } from "@/shared/lib/utils";
import { useAdminCompanies } from "../../queries/useAdminCompanies";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { memo } from "react";

export const CompaniesSidebar = memo(() => {
  const { data: adminCompanies } = useAdminCompanies();
  const [selectedCompanyId, setSelectedCompanyId] = useLocalStorage<
    string | null
  >("selected_company_id", null);
  return (
    <div className="relative z-1 flex flex-col gap-2 p-2 border-r border-border w-[250px] h-full">
      <div>
        <h2 className="px-2 py-3 font-bold text-xl">Companies:</h2>
      </div>
      {adminCompanies?.map((company) => {
        const isSelected = company._id === selectedCompanyId;

        const selectCompany = () => {
          setSelectedCompanyId(company._id);
        };

        return (
          <div
            className={cn(
              "hover:bg-zinc-800 px-2 py-3 rounded-md transition-all hover:cursor-pointer",
              isSelected && "bg-cyan-900 hover:bg-cyan-900"
            )}
            key={company._id}
            onClick={selectCompany}
          >
            {company.name}
          </div>
        );
      })}
    </div>
  );
});
