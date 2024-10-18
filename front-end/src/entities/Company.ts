import { BotTree } from "./BotTree";

export type Company = {
  _id: string;
  name: string;
  botTree: BotTree;
  admin: string;
};
