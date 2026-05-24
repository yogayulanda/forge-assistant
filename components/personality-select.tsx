import { PERSONALITIES, type PersonalityId } from "@/constants/personalities";

type Props = {
  value: PersonalityId;
  onChange: (value: PersonalityId) => void;
};

export function PersonalitySelect({ value, onChange }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-3">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">AI Personality</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PersonalityId)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-300/60"
      >
        {PERSONALITIES.map((personality) => (
          <option key={personality.id} value={personality.id}>
            {personality.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-zinc-500">
        {PERSONALITIES.find((item) => item.id === value)?.description}
      </p>
    </div>
  );
}
