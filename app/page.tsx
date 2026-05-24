"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { QuickActions } from "@/components/quick-actions";
import { ChatMessage } from "@/components/chat-message";
import { PersonalitySelect } from "@/components/personality-select";
import { ChatInput } from "@/components/chat-input";
import { CHAT_TIMEOUT_MS } from "@/constants/app";
import { DEFAULT_PERSONALITY, PERSONALITIES, type PersonalityId } from "@/constants/personalities";
import type { Message } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to Forge Assistant. Pick an AI personality and I can help you generate Jira tickets, analyze errors, or draft API documentation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [activeActionLabel, setActiveActionLabel] = useState("");
  const [personality, setPersonality] = useState<PersonalityId>(DEFAULT_PERSONALITY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatRef = useRef<HTMLElement | null>(null);

  const personalityName = useMemo(
    () => PERSONALITIES.find((item) => item.id === personality)?.label || "Assistant",
    [personality]
  );

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, error]);

  async function sendMessage() {
    const trimmed = input.trim();

    if (loading) return;

    if (!trimmed) {
      setError("Please enter a message before sending.");
      return;
    }

    setError("");

    const finalPrompt = activePrompt ? `${activePrompt}${trimmed}` : trimmed;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: finalPrompt,
          personality,
        }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed API response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "No response generated.",
        },
      ]);
    } catch (caught) {
      const fallbackMessage =
        caught instanceof Error && caught.name === "AbortError"
          ? "Request timed out. Gemini took too long to respond, please try again."
          : caught instanceof Error
            ? caught.message
            : "Something went wrong while contacting Gemini API.";

      setMessages((prev) => [...prev, { role: "assistant", content: fallbackMessage }]);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      setActivePrompt("");
      setActiveActionLabel("");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-5 md:px-6 md:py-8">
        <Header />

        <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
          <QuickActions
            onSelect={(prompt, label) => {
              setActivePrompt(prompt);
              setActiveActionLabel(label);
              setError("");
            }}
            activeLabel={activeActionLabel}
          />
          <PersonalitySelect value={personality} onChange={setPersonality} />
        </div>

        <section
          ref={chatRef}
          className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-zinc-900/60 p-4 shadow-xl backdrop-blur md:p-5"
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Active tone: {personalityName}</p>

            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {loading && (
              <div className="mr-auto max-w-[90%] rounded-2xl border border-white/10 bg-zinc-800/90 px-4 py-3 text-zinc-300">
                Gemini is thinking<span className="inline-block animate-pulse">…</span>
              </div>
            )}
          </div>
        </section>

        {error && (
          <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
        )}

        <ChatInput
          input={input}
          loading={loading}
          activeActionLabel={activeActionLabel}
          onInputChange={setInput}
          onSend={sendMessage}
        />

        <Footer />
      </div>
    </main>
  );
}
