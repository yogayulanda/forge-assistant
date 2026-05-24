"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickActions = [
  {
    label: "Generate Jira Ticket",
    prompt:
      "Act as a senior software engineer. Convert this requirement into Jira tickets with Backend task, Frontend task, priority, story point, and acceptance criteria:\n\n",
  },
  {
    label: "Analyze Error Log",
    prompt:
      "Act as a senior backend engineer. Analyze this error log. Explain probable root cause, severity, impact, and recommended fix:\n\n",
  },
  {
    label: "Generate API Docs",
    prompt:
      "Act as an API documentation assistant. Generate clean API documentation from this requirement or endpoint description:\n\n",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m Forge Assistant — an AI productivity assistant for developers powered by Gemini. Ask me to generate Jira tickets, analyze errors, or create API documentation.",
    },
  ]);

  const [input, setInput] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const finalPrompt = activePrompt ? activePrompt + input : input;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: finalPrompt,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || data.error || "No response generated.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while contacting Gemini API.",
        },
      ]);
    } finally {
      setLoading(false);
      setActivePrompt("");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6">
        <header className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl">
          <p className="text-sm text-zinc-400">Gemini API Final Project</p>
          <h1 className="mt-1 text-3xl font-bold">Forge Assistant</h1>
          <p className="mt-2 max-w-2xl text-zinc-300">
            AI Developer Productivity Assistant powered by Gemini API. Generate
            Jira tickets, analyze engineering errors, and create API
            documentation instantly.
          </p>
        </header>

        <section className="mb-4 grid gap-3 md:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                setActivePrompt(action.prompt);
                setInput("");
              }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:border-zinc-600 hover:bg-zinc-800"
            >
              <p className="font-semibold">{action.label}</p>
              <p className="mt-1 text-sm text-zinc-400">
                Click, then type your requirement or log.
              </p>
            </button>
          ))}
        </section>

        <section className="flex-1 overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`prose prose-invert rounded-2xl p-4 ${
                  message.role === "user"
                    ? "ml-auto max-w-[80%] bg-blue-600 text-white"
                    : "mr-auto max-w-[90%] bg-zinc-800 text-zinc-100"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="mr-auto max-w-[80%] rounded-2xl bg-zinc-800 p-4 text-zinc-300">
                Gemini is thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-3"
        >
          {activePrompt && (
            <div className="mb-2 rounded-xl bg-zinc-800 px-3 py-2 text-sm text-zinc-300">
              Mode active:{" "}
              {quickActions.find((a) => a.prompt === activePrompt)?.label}
            </div>
          )}

          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Forge Assistant anything..."
              className="min-h-14 flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-zinc-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-5 font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-500">
          Built with Next.js, Tailwind CSS, and Gemini API
        </p>
      </div>
    </main>
  );
}