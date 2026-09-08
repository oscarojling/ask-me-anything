# Ask Oscar Anything

A small AI chatbot that answers questions about me — background, skills, and projects — so a recruiter or anyone curious can get a quick, honest answer instead of reading through a full CV.

**Live:** [ask-me-anything-red.vercel.app](https://ask-me-anything-red.vercel.app)

## How it works

Questions are answered by a Claude model, streamed in real time, with a system prompt built from real facts about me — the assistant is instructed to never invent details about my experience or skills, and to say so plainly and point you to me directly if it doesn't know something.

Conversations are saved to a Postgres database so I can review them from a small password-protected admin page.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Vercel AI SDK](https://sdk.vercel.ai) streaming a Claude model
- [Drizzle ORM](https://orm.drizzle.team) + Postgres
- [better-auth](https://www.better-auth.com) for the admin login
- Tailwind CSS + shadcn/ui

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll need your own `.env.local` with a Postgres connection string and an Anthropic API key — see `db/schema.ts` and `app/api/chat/route.ts` for what's expected.

## More about me

Full project list, live demos, and GitHub links: [oscarojling.vercel.app](https://oscarojling.vercel.app)
