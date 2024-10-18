import { memo } from "react";
import { ReactFlowProvider } from "@xyflow/react";

import { Header } from "@/components/Header";
import { CreateCompany } from "./components/CreateCompany";
import { CompaniesSidebar } from "./components/CompaniesSidebar";
import { CompanyConfigure } from "./components/CompanyConfigure";

import { useAdminCompanies } from "./queries/useAdminCompanies";

export const AdminDashboard = memo(() => {
  const { data: adminCompanies } = useAdminCompanies();
  return (
    <div className="w-full min-h-screen">
      <Header />
      {adminCompanies?.length === 0 && (
        <div className="flex justify-center pt-20">
          <CreateCompany />
        </div>
      )}
      {adminCompanies && adminCompanies.length > 0 && (
        <div className="flex h-screen">
          <CompaniesSidebar />
          <ReactFlowProvider>
            <CompanyConfigure />
          </ReactFlowProvider>
        </div>
      )}
    </div>
  );
});
