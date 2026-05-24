const QUICK_ACTIONS = [
  {
    id: "jira",
    label: "Generate Jira Ticket",
    description: "Turn rough requirements into refined sprint-ready tickets.",
    icon: "ticket",
    prompt: "Convert this requirement into Jira tickets with Backend task, Frontend task, priority, story points, dependencies, and acceptance criteria:\n\n",
  },
  {
    id: "error",
    label: "Analyze Error Log",
    description: "Detect root cause, impact, and practical next fixes.",
    icon: "alert",
    prompt: "Analyze this error log. Explain probable root cause, severity, impact radius, and recommended fix plan:\n\n",
  },
  {
    id: "api_docs",
    label: "Generate API Docs",
    description: "Draft clean and readable API docs from endpoint notes.",
    icon: "doc",
    prompt: "Generate clear API documentation from this requirement or endpoint description. Include summary, request fields, responses, and error handling:\n\n",
  },
];

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M9 8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3l9 16H3L12 3z" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 9v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <circle cx="12" cy="16.5" r="1" fill="currentColor"/>
    </svg>
  );
}
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M8 3h6l4 4v14H8a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M10 13h8M10 17h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

function QuickActionIcon({ icon }) {
  if (icon === "ticket") return <TicketIcon />;
  if (icon === "alert") return <AlertIcon />;
  return <DocIcon />;
}

function QuickActions({ onSelect, activeLabel }) {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {QUICK_ACTIONS.map((action) => {
        const isActive = activeLabel === action.label;
        return (
          <button
            key={action.id}
            onClick={() => onSelect(action.prompt, action.label)}
            className={[
              "group rounded-2xl border bg-zinc-900/70 p-4 text-left transition duration-200",
              "hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-zinc-800/80",
              isActive ? "border-cyan-300/50" : "border-zinc-800",
            ].join(" ")}
          >
            <div className="mb-2 inline-flex rounded-lg border border-white/10 bg-white/5 p-2 text-cyan-200 transition group-hover:scale-105">
              <QuickActionIcon icon={action.icon} />
            </div>
            <p className="font-semibold text-zinc-100">{action.label}</p>
            <p className="mt-1 text-sm text-zinc-400">{action.description}</p>
          </button>
        );
      })}
    </section>
  );
}

window.QuickActions = QuickActions;
window.QUICK_ACTIONS = QUICK_ACTIONS;
