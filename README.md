# Ask Oscar Anything

I'm Oscar, training to be a frontend developer at Futuregames after a few years working in communications. I got tired of hoping recruiters would actually read my whole CV, so I built this instead: a little chatbot that answers questions about me directly. Ask it what you'd normally dig for in a CV — background, skills, projects — and it just tells you.

**Live:** [ask-me-anything-red.vercel.app](https://ask-me-anything-red.vercel.app)

## What's actually going on under the hood

A Claude model answers your question, streamed in as it's generated, using a system prompt I wrote with real facts about myself. I told it explicitly not to make anything up — if it doesn't know something, it says so and points you to me instead of guessing.

Every conversation gets saved to a Postgres database, and I've got a small password-protected `/admin` page where I can read back through what people have asked.

## Built with

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Vercel AI SDK](https://sdk.vercel.ai) to stream the Claude responses
- [Drizzle ORM](https://orm.drizzle.team) + Postgres for storage
- [better-auth](https://www.better-auth.com) for the admin login
- Tailwind CSS + shadcn/ui

Auth, databases, and ORMs were all new to me going into this one — it's as much a learning project as it is a portfolio piece.

## Running it yourself

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). You'll need your own `.env.local` with a Postgres connection string and an Anthropic API key — check `db/schema.ts` and `app/api/chat/route.ts` to see what it expects.

## Want to see more?

Rest of my projects, with live demos and code: [oscarojling.vercel.app](https://oscarojling.vercel.app)
