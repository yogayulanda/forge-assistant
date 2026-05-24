# Forge Assistant — Design System

A lightweight design system distilled from the **Forge Assistant** MVP — a polished, single-page AI developer-productivity chatbot built on Next.js + Tailwind CSS + the Gemini API. The system is intentionally tight in scope: one product, one surface (the chat page), one aesthetic (modern AI SaaS, dark canvas, cyan accents, glassy cards).

## Sources

This system was reverse-engineered from a single repository the user provided:

- **GitHub:** [yogayulanda/forge-assistant](https://github.com/yogayulanda/forge-assistant) — Next.js App Router · TypeScript · Tailwind v4 · `@google/genai` (Gemini 2.5 Flash) · React Markdown.

Read the repo directly for production-faithful detail beyond what's recreated here. Anything that isn't in the repo (e.g. additional product surfaces, marketing pages, brand guidelines) was **not invented** for this system.

## What this product is

Forge Assistant is an academic-final-project MVP. One page, one job: a chat surface where a developer picks an **AI personality** (Senior Architect / Friendly Mentor / Formal Engineer) and triggers Gemini with optional **Quick Actions** — _Generate Jira Ticket_, _Analyze Error Log_, _Generate API Docs_. There is no auth, no dashboard, no DB, no multi-page architecture.

Constants that anchor everything:

- **Name:** Forge Assistant
- **Badge:** AI Productivity MVP
- **Subtitle:** Modern AI Developer Productivity Assistant
- **Tagline:** Build faster with personality-driven AI support for ticketing, debugging, and API documentation.

## Content Fundamentals

The copy throughout the app is **clean, second-person-implicit, capability-focused, and free of marketing fluff**. The product talks to a developer, not a buyer.

- **Voice & person.** Mostly imperative or capability-statement. The product says "I can help you generate Jira tickets…" in the opening assistant turn — _then_ never speaks in first person again. Buttons and descriptions describe what the action _does_, not what the user _is_ ("Detect root cause, impact, and practical next fixes").
- **Casing.** Title Case for action labels, headings, and tab pills ("Generate Jira Ticket", "AI Personality", "Active tone"). Sentence case inside descriptions and paragraphs.
- **Punctuation.** Short sentences. Ellipses for loading ("Gemini is thinking…", "Sending…"). Em-dashes are avoided; commas and periods do the work.
- **No emoji. No exclamation points.** Anywhere. Neutral, slightly serious developer tone.
- **No unicode flourishes.** No bullets-as-glyphs, no arrows, no ★. Bullets render through Markdown only.
- **Compound feature names are unbranded.** "Quick Action", "AI Personality", "Active tone" — plain English, capitalised.
- **Errors are direct and instructional.** "Please enter a message before sending." / "Request timed out. Gemini took too long to respond, please try again." Active voice, tells the user the next step.
- **Personality system prompts are recipe-shaped.** Every personality definition reads like a role brief: who you are, how you respond, who the audience is. Short. Concrete. No hedging.

Specific examples to mirror:

> Welcome to Forge Assistant. Pick an AI personality and I can help you generate Jira tickets, analyze errors, or draft API documentation.

> Turn rough requirements into refined sprint-ready tickets.

> Built for developer productivity demos · Powered by Google Gemini

## Visual Foundations

The aesthetic is **dark, glassy, neon-edged, and quiet**. It reads as a modern AI SaaS — no skeuomorphism, no illustration, no decorative imagery — and leans on subtle radial-gradient lighting at the top of the page and a single cyan accent to carry the brand. Cards stack on a near-black canvas with translucent panels and white/10 hairline borders.

### Colors

- **Canvas.** `#09090b` (zinc-950) with a soft two-spot radial gradient at the top — cyan at 20% from the left, blue at 80% — both at 10% alpha, fading to transparent by 35%. This is the only "decoration" in the system.
- **Surfaces.** `zinc-900` and `zinc-900/60–80` translucent panels with `backdrop-blur`. The chat scroll region uses `zinc-900/60`; the input wrapper and personality select use `zinc-900/80`. Assistant message bubbles are `zinc-800/90`.
- **Borders.** Almost always `rgba(255,255,255,0.10)` — a single hairline white tint, never coloured, except focus rings and active states which pick up cyan-300 at low opacity (`cyan-300/40`, `cyan-300/60`).
- **Accent.** **Cyan-300 (`#67e8f9`) is the brand colour.** It is the only saturated colour the system uses on its own — solid cyan-300 fills the Send button, cyan-300/10 fills the active badge, cyan-200 sits on the badge as the foreground. Beyond that the brand uses a **cyan → blue → teal gradient** in exactly two places: the page H1 (bg-clip-text) and user message bubbles (cyan-600 → blue-700, 135°).
- **Text.** Zinc-100 for body, zinc-300 for subdued paragraphs, zinc-400 for descriptions, zinc-500 for uppercase eyebrow labels.
- **Semantic.** Errors only. Red-500/10 fill, red-400/30 border, red-200 text. No success, warning, or info state exists in the product.

### Typography

- **Sans:** **Geist** (Vercel's superfamily, loaded via `next/font/google` in production). Used for everything except code.
- **Mono:** **Geist Mono.** Used for inline code, code blocks, and any monospaced rendering inside Markdown.
- **Scale.** Built on Tailwind defaults. Hero H1 is `text-3xl md:text-4xl` (1.875rem → 2.25rem) **with a clipped gradient fill**. Body is the browser default 16px. Eyebrow/section labels are 12px (`text-xs`) uppercase with `tracking-wide`.
- **Weights.** 400 / 500 / 600 / 700. The hero, action labels, and button copy use 700. "AI Personality" eyebrow and chip labels use 500.

### Spacing & layout

- **Container.** `max-w-6xl` (72rem) centered, with `px-4 md:px-6` and `py-5 md:py-8`. Internal stack is a vertical flex with `gap-4`.
- **Grid.** Quick Actions + Personality is a two-column grid on `lg` (`1fr 280px`). Quick Actions internally is `md:grid-cols-3`. Below `lg`, everything stacks.
- **Card padding.** Header `p-6`. Chat shell `p-4 md:p-5`. Input `p-3`. Quick-action cards `p-4`.
- **Section gaps.** Cards between sections always `gap-4`. Inside cards, `space-y-4` between messages.

### Radii

A compact, ascending scale. **Cards are aggressively rounded** — the design language is _soft, oversized rectangles_ floating on dark.

- **`rounded-3xl` (24px):** Header card, chat shell. The two big surfaces.
- **`rounded-2xl` (16px):** Message bubbles, the input form wrapper.
- **`rounded-xl` (12px):** The textarea itself, the Send button, the Personality select panel, the error toast, the active-action toast inside the input.
- **`rounded-lg` (14px):** Select dropdown, quick-action icon tile.
- **`rounded-full`:** Top badge ("AI Productivity MVP"), footer tech chips, scrollbar thumb.

### Borders, shadows, elevation

- **Borders are the primary separator** — `border-white/10` on virtually every surface. Hover lifts to `border-cyan-300/40`. Focus/active uses `border-cyan-300/50–60`.
- **Shadows are deep and soft.** Header uses `shadow-2xl`; chat shell uses `shadow-xl`. Cards rely more on the dark canvas + border than on shadow.
- **Backdrop blur** on every glass panel — `backdrop-blur` (Tailwind default ~12px). The look is _glass over canvas with neon edge lighting_, not flat cards.

### Hover & press states

- **Quick-action card hover:** `-translate-y-0.5` (lifts 2px), border shifts to `cyan-300/40`, background shifts from `zinc-900/70` to `zinc-800/80`. The inner icon tile **scales up to 105%** (`group-hover:scale-105`).
- **Buttons hover:** Lighter, not darker — Send goes from `cyan-300` to `cyan-200`. (Inverted from typical dark-UI hover.)
- **Disabled:** `cursor-not-allowed` + `opacity-50`. No colour change.
- **Focus:** Inputs and selects swap border to `cyan-300/60`. No focus ring, no outline.
- **All transitions:** `transition` (Tailwind default 150ms) or `transition duration-200`. Easing is default `ease`. No bounces, no springs, no scale-down-on-press.

### Imagery, illustration, animation

- **No imagery.** No hero image, no avatars, no illustrations. The product is purely typographic + chromed UI.
- **No icons in marketing surfaces.** Only the three Quick Action cards use icons (inline `currentColor` SVG strokes, weight 1.7, 24×24 viewBox).
- **No animations beyond hover transitions and smooth-scroll-to-bottom.** Loading is text ("Gemini is thinking…", "Sending…"). No spinners, no shimmer, no skeletons.
- **No grain, no noise, no patterns, no texture.** The only "atmosphere" is the page-top radial gradient.

### Transparency & blur usage

Translucent surfaces over the dark canvas — `bg-zinc-900/60`, `/70`, `/80`, `/90` — pair with `backdrop-blur`. This is **a signature move**: every elevated surface is glass, not opaque. The exception is the textarea (`bg-zinc-950`, opaque) and the codeblock inside Markdown (`#0b1220`, opaque).

### Layout rules

- **Single column on mobile**, two-column (1fr + 280px sidebar) at `lg` for the Quick Actions + Personality row only.
- **Chat shell is the only scrollable region** (`overflow-y-auto`). The rest of the page is static.
- **No fixed/sticky elements.** No floating action button. No bottom nav. No top nav. The page is what you see.

## Iconography

The repo ships **exactly three custom inline-SVG icons** plus four generic placeholder SVGs from `create-next-app` (file, globe, window, next, vercel).

The three branded icons live in `components/icons.tsx` and are used only by the Quick Action cards:

| Token | Used for |
|---|---|
| `TicketIcon`  | Generate Jira Ticket |
| `AlertIcon`   | Analyze Error Log |
| `DocIcon`     | Generate API Docs |

**Style rules** (extracted directly from the source):

- 24×24 viewBox, `fill="none"`, **stroke = `currentColor`**, **strokeWidth = 1.7**, `strokeLinecap="round"` on terminating lines.
- Single-colour, no gradients, no two-tone fills.
- Rendered at `h-5 w-5` (20×20) inside a `rounded-lg` tile with a `border-white/10`, `bg-white/5` background; the colour is set on the tile via `text-cyan-200`, so the stroke inherits cyan-200.
- The icon tile scales to 105% on parent hover.

**Substitution policy.** Beyond these three, the codebase has **no icon library installed** — no Lucide, Heroicons, Tabler, or similar. When more icons are needed for a design built on this system, **substitute Lucide** (`lucide-react`, or the Lucide CDN) and **flag the substitution**. Lucide's defaults (24×24, stroke 2, round caps, no fill) are the closest visual match to the three icons that already exist; nudge stroke to **1.7** for parity.

**Other glyphs:**

- **No emoji** anywhere in product surfaces. Don't add them.
- **No unicode-as-icon** (✓, ★, →, etc).
- **The favicon is the default Next.js favicon** — no brand mark exists. There is no logo. The wordmark "Forge Assistant" rendered in the gradient-clipped H1 is the brand surface.

Icons currently in `assets/`:

- `assets/file.svg`, `assets/globe.svg`, `assets/window.svg` — generic placeholder SVGs (carried over from `public/` for reference; not actively used in product surfaces).
- `assets/favicon.ico` — the unmodified default Next.js favicon.

## Index — what's in this folder

```
Design System/
├── README.md                  ← you are here
├── SKILL.md                   ← skill manifest (for Claude Code reuse)
├── colors_and_type.css        ← all design tokens as CSS custom properties
├── assets/                    ← copied logos, icons, generic placeholder SVGs
│   ├── file.svg
│   ├── globe.svg
│   ├── window.svg
│   └── favicon.ico
├── preview/                   ← Design System tab cards (one concept each)
│   ├── colors-primary.html
│   ├── colors-neutral.html
│   ├── colors-semantic.html
│   ├── colors-gradients.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-mono.html
│   ├── radii.html
│   ├── shadows.html
│   ├── spacing.html
│   ├── buttons.html
│   ├── chips.html
│   ├── inputs.html
│   ├── messages.html
│   ├── quick-action-card.html
│   ├── personality-select.html
│   ├── icons.html
│   └── logo.html
└── ui_kits/
    └── forge-assistant/       ← high-fidelity recreation of the chat page
        ├── README.md
        ├── index.html         ← interactive click-through prototype
        ├── Header.jsx
        ├── QuickActions.jsx
        ├── PersonalitySelect.jsx
        ├── ChatStream.jsx
        ├── ChatInput.jsx
        └── Footer.jsx
```

## A note on what's missing

This MVP is small by design. The system intentionally does **not** define: avatars, profile UI, side navigation, modals, toasts, toggles, tabs, breadcrumbs, tables, charts, marketing pages, pricing, auth, dashboard widgets, light theme, mobile-specific patterns beyond column stacking. If you need any of those for a design built on top of Forge Assistant, you are extrapolating — say so, and stay within the colour/type/radius/border tokens already defined here.
