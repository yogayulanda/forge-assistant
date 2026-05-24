const PERSONALITIES = [
  {
    id: "senior_architect",
    label: "Senior Architect",
    description: "Strategic, structured, and system-level guidance.",
  },
  {
    id: "friendly_mentor",
    label: "Friendly Mentor",
    description: "Supportive coaching tone with clear, step-by-step help.",
  },
  {
    id: "formal_engineer",
    label: "Formal Engineer",
    description: "Professional, precise, and documentation-style responses.",
  },
];

function PersonalitySelect({ value, onChange }) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-3">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">AI Personality</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-300/60"
      >
        {PERSONALITIES.map((p) => (
          <option key={p.id} value={p.id}>{p.label}</option>
        ))}
      </select>
      <p className="mt-2 text-xs text-zinc-500">
        {PERSONALITIES.find((item) => item.id === value)?.description}
      </p>
    </div>
  );
}

window.PERSONALITIES = PERSONALITIES;
window.PersonalitySelect = PersonalitySelect;
