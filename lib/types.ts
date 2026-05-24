import type { PersonalityId } from "@/constants/personalities";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequestBody = {
  message: string;
  personality: PersonalityId;
};
