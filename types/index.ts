export enum OpenAIModel {
  GPT_3_5 = "gpt-3.5-turbo",
  // GPT_4 = "gpt-4"
}

export const OpenAIModelNames: Record<OpenAIModel, string> = {
  [OpenAIModel.GPT_3_5]: "ChatBTC",
  // [OpenAIModel.GPT_4]: "GPT-4"
};

export interface Message {
  role: Role;
  content: string;
}

export type Role = "assistant" | "user";

export interface Conversation {
  id: number;
  name: string;
  messages: Message[];
}
