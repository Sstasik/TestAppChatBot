import { memo, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useCompanyChat } from "./queries/useCompanyChat";
import { Header } from "@/components/Header";
import { cn } from "@/shared/lib/utils";
import { api } from "@/api";
import { toast } from "sonner";
import { Button } from "@/ui/button";

export const UserChat = memo(() => {
  const [searchParams] = useSearchParams();

  const companyId = useMemo(() => {
    return searchParams.get("companyId");
  }, [searchParams]);

  const { company, isLoading, messages, goToNextQuestion, clearChatHistory } =
    useCompanyChat(companyId);

  useEffect(() => {
    console.log("FIRSTTT", { messages });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen">
        <Header />
        <div className="justify-center items-center py-14 w-full h-full">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="px-4 py-20 w-full">
        <div className="flex gap-4">
          <h1 className="font-bold text-4xl">Chat with {company?.name}</h1>
          <Button onClick={clearChatHistory}>Clear history</Button>
        </div>
        <div className="flex flex-col gap-4 py-8">
          {messages.map((message, index) => {
            const isCurrentQuesiton = index === messages.length - 1;

            return (
              <div
                className="flex flex-col gap-4"
                key={`question-${message.question.id}`}
              >
                <h2 className="font-bold text-2xl">
                  {message.question.data.value}
                </h2>
                <div className="flex gap-4">
                  {message.answers.map((answer) => {
                    const select = async () => {
                      try {
                        if (!companyId) {
                          return;
                        }
                        const { answered, ...restAnswer } = answer;
                        await api.answers.addAnswer(companyId, restAnswer);
                        goToNextQuestion(answer);
                      } catch (error) {
                        toast.error("Error happened while saving the answer");
                      }
                    };

                    return (
                      <button
                        disabled={!isCurrentQuesiton}
                        key={`answer-${answer.id}`}
                        onClick={select}
                        className={cn(
                          "px-10 py-10 border rounded-xl text-xl transition-all",
                          answer.answered ? "border-white" : "border-border",
                          !isCurrentQuesiton
                            ? ""
                            : "hover:border-white hover:cursor-pointer"
                        )}
                      >
                        {answer.data.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
