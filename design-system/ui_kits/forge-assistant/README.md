# Forge Assistant — UI Kit

A high-fidelity React recreation of the entire Forge Assistant product surface — one page, one chat, one personality picker, three quick actions. Recreated cosmetically from [`yogayulanda/forge-assistant`](https://github.com/yogayulanda/forge-assistant) using exact Tailwind classes, identical copy, and the same component decomposition as the original codebase.

## Run

Open `index.html` directly in a browser. No build step — Tailwind is loaded via CDN; React + Babel are loaded inline; the original `@google/genai` Gemini call is replaced with a `fakeGeminiCall` (`fakeGemini.js`) that returns canned, plausible responses based on simple pattern matching on the prompt.

## What's covered

| File | Recreates |
|---|---|
| `Header.jsx` | Top hero card — badge pill + gradient-clipped H1 wordmark + subtitle + supporting copy |
| `QuickActions.jsx` | The three action cards (Jira / Error log / API docs) with hover lift + active border |
| `PersonalitySelect.jsx` | Sidebar dropdown — eyebrow label, native `<select>`, description caption |
| `ChatStream.jsx` | Scrollable chat shell — assistant bubbles (zinc-800/90 + white/10 border), user bubbles (cyan-600 → blue-700 gradient), "Gemini is thinking…" loader, eyebrow with active tone |
| `ChatInput.jsx` | Auto-resizing textarea, cyan-300 Send button, active Quick Action toast |
| `Footer.jsx` | Tech-stack chip row + signoff |
| `App.jsx` | Wires everything; manages messages, input, active prompt, personality, loading, error |
| `fakeGemini.js` | Mock Gemini responder — pattern-matches the prompt and returns a canned Jira/Error/API/default response after 700–1200ms |

## What's intentionally not real

- No actual Gemini API call — `fakeGemini.js` returns canned, plausible responses.
- No Markdown rendering — the original uses `react-markdown`; this prototype renders content as `whitespace: pre-wrap` text for visual parity without the extra dependency. Code blocks and lists in the canned responses appear as plain text. Faithful to layout, not to Markdown styling.
- No request timeout / abort.
- No persistence — refresh clears the conversation.

## Try it

1. Open the page — you land on the chat with a greeting.
2. Click a Quick Action card (e.g. **Generate Jira Ticket**) — a cyan toast appears above the input.
3. Type something like "OAuth login" and press **Send** (or Enter).
4. The "Gemini is thinking…" bubble shows for ~1 second, then a canned, structured response renders.
5. Swap the **AI Personality** in the sidebar — the active tone updates in the chat eyebrow.

The visual surface — colours, radii, hover states, gradients, typography — matches the upstream repo class-for-class.
