import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";

type Props = {
  message: Message;
};

export function ChatMessage({ message }: Props) {
  return (
    <div
      className={cn(
        "markdown-body rounded-2xl px-4 py-3",
        message.role === "user"
          ? "ml-auto max-w-[85%] bg-gradient-to-br from-cyan-600 to-blue-700 text-white"
          : "mr-auto max-w-[90%] border border-white/10 bg-zinc-800/90 text-zinc-100"
      )}
    >
      <ReactMarkdown>{message.content}</ReactMarkdown>
    </div>
  );
}
