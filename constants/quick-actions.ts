export type QuickAction = {
  id: "jira" | "error" | "api_docs";
  label: string;
  description: string;
  icon: string;
  prompt: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "jira",
    label: "Generate Jira Ticket",
    description: "Turn rough requirements into refined sprint-ready tickets.",
    icon: "ticket",
    prompt:
      "Convert this requirement into Jira tickets with Backend task, Frontend task, priority, story points, dependencies, and acceptance criteria:\n\n",
  },
  {
    id: "error",
    label: "Analyze Error Log",
    description: "Detect root cause, impact, and practical next fixes.",
    icon: "alert",
    prompt:
      "Analyze this error log. Explain probable root cause, severity, impact radius, and recommended fix plan:\n\n",
  },
  {
    id: "api_docs",
    label: "Generate API Docs",
    description: "Draft clean and readable API docs from endpoint notes.",
    icon: "doc",
    prompt:
      "Generate clear API documentation from this requirement or endpoint description. Include summary, request fields, responses, and error handling:\n\n",
  },
];
