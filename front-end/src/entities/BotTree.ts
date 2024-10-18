export type Question = {
  id: string;
  type: "textUpdater";
  data: { label: string; value: string };
  measured?: { width: number; height: number };
  position: { x: number; y: number };
};

export type Answer = {
  id: string;
  type: "textUpdater";
  data: { label: string; value: string };
  source: string;
  target: string;
  selected: boolean;
};

export type BotTree = {
  nodes: Question[]; // QUESTIONS
  edges: Answer[]; // Answers
};
