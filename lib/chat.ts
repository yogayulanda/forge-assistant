import { DEFAULT_PERSONALITY, PERSONALITIES, type PersonalityId } from "@/constants/personalities";

export function getPersonalityPrompt(personality: PersonalityId) {
  return (
    PERSONALITIES.find((item) => item.id === personality)?.systemPrompt ||
    PERSONALITIES.find((item) => item.id === DEFAULT_PERSONALITY)?.systemPrompt ||
    "You are a helpful AI software assistant."
  );
}
