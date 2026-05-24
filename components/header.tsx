import { APP_BADGE, APP_NAME, APP_SUBTITLE } from "@/constants/app";

export function Header() {
  return (
    <header className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur">
      <div className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
        {APP_BADGE}
      </div>
      <h1 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-200 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
        {APP_NAME}
      </h1>
      <p className="mt-2 text-zinc-300">{APP_SUBTITLE}</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Build faster with personality-driven AI support for ticketing, debugging, and API documentation.
      </p>
    </header>
  );
}
