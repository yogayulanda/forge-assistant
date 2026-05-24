function App() {
  const [messages, setMessages] = React.useState([
    {
      role: "assistant",
      content: "Welcome to Forge Assistant. Pick an AI personality and I can help you generate Jira tickets, analyze errors, or draft API documentation.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [activePrompt, setActivePrompt] = React.useState("");
  const [activeActionLabel, setActiveActionLabel] = React.useState("");
  const [personality, setPersonality] = React.useState("senior_architect");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const personalityName = React.useMemo(
    () => window.PERSONALITIES.find((p) => p.id === personality)?.label || "Assistant",
    [personality]
  );

  async function sendMessage() {
    const trimmed = input.trim();
    if (loading) return;
    if (!trimmed) { setError("Please enter a message before sending."); return; }
    setError("");

    const finalPrompt = activePrompt ? `${activePrompt}${trimmed}` : trimmed;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const text = await window.fakeGeminiCall(finalPrompt);
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong while contacting Gemini API." }]);
    } finally {
      setLoading(false);
      setActivePrompt("");
      setActiveActionLabel("");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-5 md:px-6 md:py-8">
        <window.Header />

        <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
          <window.QuickActions
            onSelect={(prompt, label) => {
              setActivePrompt(prompt);
              setActiveActionLabel(label);
              setError("");
            }}
            activeLabel={activeActionLabel}
          />
          <window.PersonalitySelect value={personality} onChange={setPersonality} />
        </div>

        <window.ChatStream messages={messages} loading={loading} personalityName={personalityName} />

        {error && (
          <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
        )}

        <window.ChatInput
          input={input}
          loading={loading}
          activeActionLabel={activeActionLabel}
          onInputChange={setInput}
          onSend={sendMessage}
        />

        <window.Footer />
      </div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
