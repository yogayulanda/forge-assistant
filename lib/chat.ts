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

const IN_SCOPE_KEYWORDS = [
  "code",
  "coding",
  "programming",
  "software",
  "developer",
  "engineering",
  "bug",
  "debug",
  "error",
  "stack trace",
  "exception",
  "refactor",
  "architecture",
  "system design",
  "api",
  "endpoint",
  "database",
  "query",
  "sql",
  "schema",
  "test",
  "unit test",
  "integration test",
  "ci",
  "cd",
  "deploy",
  "devops",
  "jira",
  "ticket",
  "story point",
  "acceptance criteria",
  "documentation",
  "markdown",
  "typescript",
  "javascript",
  "react",
  "next.js",
  "tailwind",
  "node",
  "backend",
  "frontend",
  "microservice",
  "performance",
  "optimization",
  "algorithm",
  "pull request",
  "review",
  "commit",
  "git",
  "terminal",
];

export function isInDeveloperProductivityScope(message: string) {
  const normalized = message.toLowerCase();
  return IN_SCOPE_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export const OUT_OF_SCOPE_REPLY =
  "I can only help with software engineering and developer productivity tasks. Please ask about coding, debugging, architecture, Jira tickets, API docs, testing, or related developer workflows.";
