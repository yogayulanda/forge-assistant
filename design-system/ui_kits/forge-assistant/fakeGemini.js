// Fake Gemini responder — pattern-matches the user's prompt to return a plausible
// canned response. No actual API calls. Used by the UI kit's index.html prototype.

const CANNED = {
  jira: `**Feature:** Add OAuth login flow

**Backend task — \`AUTH-204\`**
Implement OAuth 2.0 authorization-code flow with Google and GitHub providers. Token storage in HTTP-only cookies. Refresh-token rotation.
Priority: High · Story points: 8 · Dependencies: \`AUTH-101\` (session middleware)

**Frontend task — \`AUTH-205\`**
Add "Continue with Google / GitHub" buttons on the sign-in screen. Post-auth redirect to \`/app\`. Loading + error states.
Priority: High · Story points: 5 · Dependencies: AUTH-204

**Acceptance criteria**
- User completes OAuth round-trip in under 3 seconds on broadband
- Failed auth surfaces a non-technical error toast
- Session persists across reload until refresh token expires`,

  error: `**Probable root cause**
The \`TypeError: Cannot read properties of undefined (reading 'map')\` originates from \`UserList.tsx:42\` when the \`users\` prop is consumed before the fetch resolves.

**Severity:** Medium — blocks first paint on the Users page only.

**Impact radius**
- Any route that mounts \`<UserList>\` directly without a Suspense boundary
- Estimated ~12% of authenticated sessions land here on cold start

**Recommended fix**
1. Guard the render: \`users?.map(...)\` or early-return on \`undefined\`
2. Wrap the route in \`<Suspense fallback={<UserListSkeleton />}>\`
3. Add a regression test that mounts with \`users={undefined}\``,

  api: `## \`POST /api/chat\`

Generate an AI response from the Forge Assistant using a selected personality.

**Request body**
| Field | Type | Required | Description |
|---|---|---|---|
| \`message\` | string | yes | The user prompt. Trimmed; must be non-empty. |
| \`personality\` | string | no | One of \`senior_architect\`, \`friendly_mentor\`, \`formal_engineer\`. Defaults to \`senior_architect\`. |

**Successful response** \`200 OK\`
\`\`\`json
{ "text": "…generated response…" }
\`\`\`

**Errors**
- \`400\` — \`{ "error": "Message is required" }\` when the message is missing or empty
- \`500\` — \`{ "error": "Failed to generate AI response from Gemini API." }\` on upstream failure`,

  default: `Here's a structured take.

**Context**
You're asking about a system-level concern, so I'll keep this practical.

**Recommendation**
- Start with the smallest surface area that exercises the failure mode end-to-end
- Add a single integration test before you refactor — it's the cheapest checkpoint you'll ever have
- Defer the abstraction until you have at least two real call sites

Want me to draft a Jira ticket or sketch the API shape?`,
};

function fakeGenerate(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes("jira") || p.includes("ticket")) return CANNED.jira;
  if (p.includes("error") || p.includes("log") || p.includes("crash") || p.includes("stack")) return CANNED.error;
  if (p.includes("api") || p.includes("endpoint") || p.includes("doc")) return CANNED.api;
  return CANNED.default;
}

// Resolve after 700–1200ms so the "Gemini is thinking…" state shows.
function fakeGeminiCall(prompt) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeGenerate(prompt)), 700 + Math.random() * 500);
  });
}

window.fakeGeminiCall = fakeGeminiCall;
