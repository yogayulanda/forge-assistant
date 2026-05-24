import { QUICK_ACTIONS } from "@/constants/quick-actions";
import { AlertIcon, DocIcon, TicketIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = {
  onSelect: (prompt: string, label: string) => void;
  activeLabel: string;
};

function QuickActionIcon({ icon }: { icon: string }) {
  if (icon === "ticket") return <TicketIcon />;
  if (icon === "alert") return <AlertIcon />;
  return <DocIcon />;
}

export function QuickActions({ onSelect, activeLabel }: Props) {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {QUICK_ACTIONS.map((action) => {
        const isActive = activeLabel === action.label;
        return (
          <button
            key={action.id}
            onClick={() => onSelect(action.prompt, action.label)}
            className={cn(
              "group rounded-2xl border bg-zinc-900/70 p-4 text-left transition duration-200",
              "hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-zinc-800/80",
              isActive ? "border-cyan-300/50" : "border-zinc-800"
            )}
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
