---
name: forge-assistant-design
description: Use this skill to generate well-branded interfaces and assets for Forge Assistant — a polished AI developer-productivity chatbot (Next.js + Tailwind + Gemini) — either for production or throwaway prototypes / mocks / decks. Contains the essential design guidelines, colour & type tokens, asset references, and a high-fidelity React UI kit for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. The `ui_kits/forge-assistant/` folder is the fastest starting point — it's a self-contained click-through that recreates the entire product surface with the exact Tailwind classes the upstream codebase uses, so you can lift components wholesale.

If working on production code, copy the tokens from `colors_and_type.css` (or read them through and inline as Tailwind classes — the system maps cleanly to default Tailwind), respect the iconography rules (Lucide as the substitution library, stroke width 1.7), and stay within the surface vocabulary defined in `README.md → Visual Foundations`.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few clarifying questions (Are we extending Forge Assistant itself? Designing a new view that should match its aesthetic? Producing a marketing surface that doesn't yet exist in the system?), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Brand colour:** cyan-300 (`#67E8F9`). Used solid on primary actions only.
- **Headline gradient (one usage only — H1):** cyan-300 → blue-300 → teal-200, 90°, bg-clip-text.
- **User-message gradient (one usage only):** cyan-600 → blue-700, 135°.
- **Canvas:** zinc-950 + two-spot radial wash at 10% alpha (cyan top-left, blue top-right).
- **Surfaces:** zinc-900/60–90 translucent with `backdrop-blur`. Borders are `white/10`.
- **Type:** Geist (sans) + Geist Mono. Tailwind default scale.
- **Radii:** 24 / 16 / 12 / 14 / pill. Big surfaces use `rounded-3xl`.
- **No emoji. No unicode glyph icons. No illustrations. No animation beyond hover.**
- **Hover lifts**, never darkens (Send goes cyan-300 → cyan-200, not the other way).

## Caveats

- The upstream MVP is small. It does **not** define dashboards, modals, toasts, side nav, light theme, marketing surfaces, or charts. If a design needs any of those, extrapolate carefully from the existing tokens and flag the extrapolation to the user.
- There is no logo mark — only a gradient-clipped wordmark. Don't invent one.
- No icon library is installed in the upstream repo. Substitute Lucide (stroke 1.7 to match the three existing inline SVGs) and flag the substitution.
