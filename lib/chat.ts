import { DEFAULT_PERSONALITY, PERSONALITIES, type PersonalityId } from "@/constants/personalities";

export function getPersonalityPrompt(personality: PersonalityId) {
  const baseGuardrails =
    "You are Forge Assistant, focused only on AI developer productivity tasks. Only answer topics related to software engineering workflows such as coding, debugging, architecture, Jira/task writing, API docs, testing, CI/CD, logs, code review, and developer tooling. If the request is outside this scope, politely refuse and redirect to an in-scope software engineering request.";

  return (
    `${baseGuardrails}\n\n${
      PERSONALITIES.find((item) => item.id === personality)?.systemPrompt ||
      PERSONALITIES.find((item) => item.id === DEFAULT_PERSONALITY)?.systemPrompt ||
      "You are a helpful AI software assistant."
    }`
  );
}

export function isInDeveloperProductivityScope(message: string) {
  const normalized = message.toLowerCase();

  // Detect obvious technical/code patterns first (language-agnostic).
  if (
    /```|{.*}|;|=>|function\s|\bclass\s|\bimport\s|\bconst\s|\blet\s|\bvar\s/i.test(
      normalized
    )
  ) {
    return true;
  }

  // Broad multilingual developer intent cues.
  const DEV_INTENT = [
    "code",
    "coding",
    "programming",
    "software",
    "developer",
    "engineering",
    "bug",
    "debug",
    "error",
    "api",
    "database",
    "test",
    "deploy",
    "jira",
    "documentation",
    "typescript",
    "javascript",
    "react",
    "next.js",
    "backend",
    "frontend",
    "git",
    "terminal",
    "kode",
    "pemrograman",
    "debug",
    "error",
    "perbaiki kode",
    "bantu saya memperbaiki",
    "arsitektur",
    "dokumentasi api",
    "basis data",
    "query",
    "pengujian",
    "deploy",
  ];

  if (DEV_INTENT.some((keyword) => normalized.includes(keyword))) {
    return true;
  }

  // Reject only when the request is clearly unrelated to developer workflows.
  const CLEARLY_OUT_OF_SCOPE = [
    "president",
    "presiden",
    "politic",
    "politik",
    "election",
    "pemilu",
    "cuaca",
    "weather",
    "zodiac",
    "horoscope",
    "celebrity",
    "selebriti",
    "football score",
    "skor bola",
    "resep masakan",
    "recipe",
    "movie recommendation",
    "rekomendasi film",
  ];

  if (CLEARLY_OUT_OF_SCOPE.some((keyword) => normalized.includes(keyword))) {
    return false;
  }

  // Allow uncertain cases to avoid blocking valid requests in other languages.
  return true;
}

export const OUT_OF_SCOPE_REPLY =
  "I can only help with software engineering and developer productivity tasks. Please ask about coding, debugging, architecture, Jira tickets, API docs, testing, or related developer workflows.";
