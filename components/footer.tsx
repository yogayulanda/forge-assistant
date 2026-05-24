export function Footer() {
  return (
    <footer className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-zinc-400">
      <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
        {[
          "Next.js App Router",
          "TypeScript",
          "Tailwind CSS",
          "Gemini API",
          "React Markdown",
        ].map((item) => (
          <span key={item} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs">
            {item}
          </span>
        ))}
      </div>
      <p>Built for developer productivity demos • Powered by Google Gemini</p>
    </footer>
  );
}
