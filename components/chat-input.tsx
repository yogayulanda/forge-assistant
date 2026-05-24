import { useEffect, useRef } from "react";
import { resizeTextarea } from "@/lib/utils";

type Props = {
  input: string;
  loading: boolean;
  activeActionLabel: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export function ChatInput({
  input,
  loading,
  activeActionLabel,
  onInputChange,
  onSend,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) resizeTextarea(textareaRef.current);
  }, [input]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/80 p-3"
    >
      {activeActionLabel && (
        <div className="mb-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
          Quick Action: {activeActionLabel}
        </div>
      )}

      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask Forge Assistant anything..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          className="max-h-[220px] min-h-14 flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
