import { api } from "@/api";
import { Answer, Question } from "@/entities/BotTree";
import { Company } from "@/entities/Company";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useCompanyChat = (id: string | null) => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<
    { question: Question; answers: (Answer & { answered: boolean })[] }[]
  >([]);

  const companySelect = useCallback((data: Company) => {
    return { company: data };
  }, []);

  const { data, isLoading: companyLoading } = useQuery({
    queryKey: ["user", "company", id],
    queryFn: () => api.companies.getCompanyById(id!),
    enabled: !!id,
    select: companySelect,
  });

  const { data: selectedAnswers, isLoading: selectedAnswersLoading } = useQuery(
    {
      queryKey: ["user", "selectedAnswers", id],
      queryFn: () => api.answers.getUserAnswers(id!),
      enabled: !!id,
    }
  );

  const noAnswersInit = useCallback(() => {
    if (!data?.company) {
      return;
    }
    const startQuestion = data!.company.botTree.nodes[0];
    const startAnswers = data!.company.botTree.edges.filter(
      (answer) => answer.source === startQuestion.id
    );
    setMessages([
      {
        question: startQuestion,
        answers: startAnswers.map((answer) => {
          return { ...answer, answered: false };
        }),
      },
    ]);
  }, [data]);

  useEffect(() => {
    const init = () => {
      if (selectedAnswers?.answers.length) {
        const messages: {
          question: Question;
          answers: (Answer & { answered: boolean })[];
        }[] = [];
        selectedAnswers.answers.forEach((answer) => {
          const foundQuestion = data?.company.botTree.nodes.find(
            (question) => question.id === answer.source
          );
          if (!foundQuestion) {
            return;
          }
          const foundAnswers = data?.company.botTree.edges.filter(
            (answer) => answer.source === foundQuestion?.id
          );

          const message: {
            question: Question;
            answers: (Answer & { answered: boolean })[];
          } = {
            question: foundQuestion,
            answers:
              foundAnswers?.map((a) => {
                if (a.id === answer.id) {
                  return {
                    ...a,
                    answered: true,
                  };
                } else {
                  return {
                    ...a,
                    answered: false,
                  };
                }
              }) ?? [],
          };
          messages.push(message);
        });

        const lastMessage = messages[messages.length - 1];

        const lastAnswer = lastMessage.answers.find((a) => a.answered);

        const nextQuestion = data?.company.botTree.nodes.find(
          (question) => question.id === lastAnswer?.target
        );

        if (!nextQuestion) {
          setMessages(messages);
          return;
        } else {
          const nextAnswers =
            data?.company.botTree.edges.filter(
              (a) => a.source === nextQuestion.id
            ) ?? [];
          const nextMessage: {
            question: Question;
            answers: (Answer & { answered: boolean })[];
          } = {
            question: nextQuestion,
            answers: nextAnswers.map((a) => {
              return {
                ...a,
                answered: false,
              };
            }),
          };

          setMessages([...messages, nextMessage]);
        }
      } else {
        noAnswersInit();
      }
    };

    if (data?.company.botTree) {
      init();
    }
  }, [selectedAnswers, data]);

  const goToNextQuestion = useCallback(
    (answer: Answer & { answered: boolean }) => {
      const nextQuestion = data?.company.botTree.nodes.find(
        (question) => question.id === answer.target
      );
      const nextQuestionAnswers =
        data?.company.botTree.edges.filter(
          (answer) => answer.source === nextQuestion?.id
        ) ?? [];

      if (!nextQuestion) {
        return;
      }

      setMessages((prev) => {
        const prevCopy = prev;

        const messagesWithSelectedAnswer = prevCopy.map((message) => {
          const foundAnswerIndex = message.answers.findIndex(
            (a) => a.id === answer.id
          );

          if (foundAnswerIndex > -1) {
            const asnwersCopy = message.answers;
            asnwersCopy[foundAnswerIndex].answered = true;
            return {
              question: message.question,
              answers: asnwersCopy,
            };
          }

          return message;
        });

        return [
          ...messagesWithSelectedAnswer,
          {
            question: nextQuestion,
            answers: nextQuestionAnswers.map((answer) => {
              return { ...answer, answered: false };
            }),
          },
        ];
      });
    },
    [data?.company]
  );

  const clearChatHistory = useCallback(async () => {
    if (!id) {
      return;
    }
    try {
      await api.answers.cleanAnswers(id);
      noAnswersInit();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error) {
      toast.error("Error happened while clearing the answers");
    }
  }, [id, queryClient, noAnswersInit]);

  return {
    company: data?.company,
    isLoading: companyLoading || selectedAnswersLoading,
    goToNextQuestion,
    clearChatHistory,
    messages,
  };
};
