# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers evaluating Oscar for frontend/full-stack developer internships and roles. Secondary: general site visitors (friends, other students, anyone curious) exploring his portfolio — the product is built to serve both equally, not just the recruiter case.

## Product Purpose

An AI chatbot on Oscar's personal site that answers visitor questions about Oscar directly, in his own facts and voice, instead of requiring them to read a full CV or portfolio page. It exists to do two things at once: give recruiters fast, specific answers, and serve as a live demonstration of Oscar's frontend/full-stack ability, since the chatbot itself is a real working project he built.

## Positioning

Unlike a static CV or portfolio page, a visitor can ask exactly what they want to know and get a direct, honest answer in seconds. It is also self-demonstrating: the fact that it works (Next.js + Vercel AI SDK streaming a Claude model + Drizzle/Postgres + better-auth) is itself evidence of the skills a recruiter is trying to evaluate.

## Operating Context

Lives as the main interactive surface on Oscar's personal site. His broader portfolio and project list live at oscarojling.vercel.app; this chatbot is a standalone Next.js app. Visitors arrive with no prior context about Oscar and type free-form questions. Oscar has a password-protected /admin panel (better-auth email/password login) to review past conversations.

## Capabilities and Constraints

- Answers are generated from a fixed system prompt containing verified facts about Oscar (background, education, skills, work history, projects, interests). The assistant must never invent details about his experience, skills, or opinions.
- Must be honest about Oscar's early-career skill level rather than oversell it; it's fine to say he's still learning something.
- If asked something not covered by the known facts, the assistant says so plainly and suggests contacting Oscar directly.
- Conversations and messages persist to Postgres (Drizzle ORM) so Oscar can review them via the admin panel.
- Responses stream in real time via the Vercel AI SDK using an Anthropic Claude model.

## Brand Commitments

- Answers are written in third person ("Oscar built...", "he's currently learning...").
- Tone: professional but approachable, a little personality — sounds like a person, not a CV read aloud.
- Answers are kept short (2-4 sentences) unless the visitor asks for more detail.

## Evidence on Hand

- Oscar's full biography, work history, skills, and personal interests are encoded directly in `app/api/chat/route.ts`'s `SYSTEM_PROMPT` — treat this as the canonical source of truth for facts about Oscar rather than inferring or inventing them elsewhere.
- Full project list with live demos and GitHub links: https://oscarojling.vercel.app
- GitHub: github.com/oscarojling

## Product Principles

- Never fabricate facts, skills, or experience Oscar doesn't actually have; when in doubt, say he's still learning or defer to contacting him directly.
- Serve two audiences at once (recruiters seeking quick answers, casual visitors exploring) without treating either as secondary.
- The product's own technical execution (streaming, auth, a real database) is part of what it demonstrates, not just plumbing behind it.
- Keep the tone human and concise; avoid corporate phrasing or anything that reads like a CV recited aloud.
