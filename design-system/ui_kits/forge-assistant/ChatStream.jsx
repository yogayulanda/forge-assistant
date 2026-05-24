function ChatBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={[
        "rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed",
        isUser
          ? "ml-auto max-w-[85%] bg-gradient-to-br from-cyan-600 to-blue-700 text-white"
          : "mr-auto max-w-[90%] border border-white/10 bg-zinc-800/90 text-zinc-100",
      ].join(" ")}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {message.content}
    </div>
  );
}

function ChatStream({ messages, loading, personalityName }) {
  const bottomRef = React.useRef(null);
  React.useEffect(() => {
    bottomRef.current?.scrollTo?.({ top: 1e9, behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section
      ref={bottomRef}
      className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-zinc-900/60 p-4 shadow-xl backdrop-blur md:p-5"
      style={{ minHeight: 0 }}
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Active tone: {personalityName}</p>
        {messages.map((m, i) => <ChatBubble key={i} message={m} />)}
        {loading && (
          <div className="mr-auto max-w-[90%] rounded-2xl border border-white/10 bg-zinc-800/90 px-4 py-3 text-zinc-300">
            Gemini is thinking<span className="inline-block animate-pulse">…</span>
          </div>
        )}
      </div>
    </section>
  );
}

window.ChatStream = ChatStream;
window.ChatBubble = ChatBubble;
