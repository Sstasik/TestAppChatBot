import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEdges, useNodes } from "@xyflow/react";
import { toast } from "sonner";

import { api } from "@/api";
import { Answer, Question } from "@/entities/BotTree";

import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useSelectedCompany } from "../../queries/useSelectedCompany";

import { Button } from "@/ui/button";
import { BotBuilder } from "../BotBuilder";

import "@xyflow/react/dist/style.css";
import { useAdminCompanies } from "../../queries/useAdminCompanies";

const defaultNodes: Question[] = [
  {
    id: "0",
    type: "textUpdater",
    data: { label: "Question", value: "How can i help you?" },
    position: { x: 150, y: 0 },
  },
];

export const CompanyConfigure = memo(() => {
  const queryClient = useQueryClient();
  const [selectedCompanyId, setSelectedCompanyId] = useLocalStorage<
    string | null
  >("selected_company_id", null);
  const { data: company, isLoading } = useSelectedCompany(selectedCompanyId);
  const { data: companies } = useAdminCompanies();

  const [updatingBotData, setUpdatingBotData] = useState(false);
  const [updatingName, setUpdatingName] = useState(false);

  const [companyName, setCompanyName] = useState("");

  const nodes = useNodes();
  const edges = useEdges();

  const hadnleCompanyNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCompanyName(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (company?.name) {
      setCompanyName(company.name);
    }
  }, [company?.name]);

  const updateBotTreeData = useCallback(async () => {
    if (!selectedCompanyId) {
      return;
    }

    setUpdatingBotData(true);
    try {
      await api.companies.updateCompany(selectedCompanyId, {
        botTree: { nodes: nodes as Question[], edges: edges as Answer[] },
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "company", selectedCompanyId],
      });
    } catch (error) {
      toast.error("Error while saving bot tree :(");
    }
    setUpdatingBotData(false);
  }, [selectedCompanyId, nodes, edges, queryClient]);

  const updateCompanyName = useCallback(async () => {
    if (!selectedCompanyId) {
      return;
    }
    setUpdatingName(true);
    try {
      await api.companies.updateCompany(selectedCompanyId, {
        name: companyName,
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "company", selectedCompanyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "companies"],
      });
    } catch (error) {
      toast.error("Error while updating name :(");
    }
    setUpdatingName(false);
  }, [selectedCompanyId, queryClient, companyName]);

  const deleteCompany = useCallback(async () => {
    if (!selectedCompanyId) {
      return;
    }
    try {
      await api.companies.deleteCompany(selectedCompanyId);
      await queryClient.invalidateQueries({
        queryKey: ["admin", "companies"],
      });
      if (companies?.length) {
        setSelectedCompanyId(companies[companies.length - 1]._id);
      }
    } catch (error) {
      toast.error("Error while deleting company :(");
    }
  }, [selectedCompanyId, companies, setSelectedCompanyId, queryClient]);

  const copyBotLink = useCallback(() => {
    navigator.clipboard.writeText(
      `${window.location.origin}/chat?companyId=${selectedCompanyId}`
    );
    toast.success("Coppied");
  }, [selectedCompanyId]);

  if (!selectedCompanyId) {
    return (
      <div className="flex w-full h-screen">
        <div className="flex justify-center items-center w-full h-full text-zinc-500">
          Please select company
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full h-screen">
        <div className="flex justify-center items-center w-full h-full text-zinc-500">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="space-y-4 px-4 pt-20 w-full">
        <div className="flex justify-between items-center">
          <input
            className="bg-transparent py-2 border-b font-bold text-4xl outline-none"
            value={companyName}
            onChange={hadnleCompanyNameChange}
          />
          <div className="flex items-center gap-2">
            <Button onClick={copyBotLink}>Copy bot link</Button>
            <Button
              disabled={updatingName || companyName.length < 3}
              onClick={updateCompanyName}
              variant="secondary"
            >
              {updatingName ? "Updating..." : "Update"}
            </Button>
            <Button variant="outline" onClick={deleteCompany}>
              Delete company
            </Button>
          </div>
        </div>
        <h3 className="text-2xl">Bot tree configuration</h3>
        {company?.botTree ? (
          <BotBuilder
            key={`${selectedCompanyId}_bot_builder`}
            initialNodes={
              company.botTree.nodes.length > 0
                ? company.botTree.nodes
                : defaultNodes
            }
            initialEdges={company.botTree.edges}
          />
        ) : (
          <BotBuilder
            key={`${selectedCompanyId}_bot_builder`}
            initialNodes={defaultNodes}
            initialEdges={[]}
          />
        )}

        <div className="flex justify-end">
          <Button
            disabled={updatingBotData}
            onClick={updateBotTreeData}
            className="w-[200px]"
          >
            {updatingBotData ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
});
