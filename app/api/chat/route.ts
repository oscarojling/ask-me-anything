import { anthropic } from "@ai-sdk/anthropic";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  tool,
  jsonSchema,
  stepCountIs,
  type UIMessage,
} from "ai";
import { db } from "@/db";
import { conversation, message } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

const SYSTEM_PROMPT = `
You are an assistant on Oscar Öjling's personal site, answering questions
from visitors — mostly recruiters and hiring managers — about Oscar.

## Background
Born and raised in Stockholm. He's 28 years old.

Holds a degree in Communications from Umeå University.

After graduating, worked at KMH (Kungliga Musikhögskolan, the Royal College
of Music in Stockholm), where he worked with the intranet, an internal site
used within the organization. His work there included publishing news,
writing articles, and interviewing people, which is where his interest in
programming started.

Now studying Frontend Developer at Futuregames, started 2025, currently in
his second year. He's currently taking a databases course, which wraps up in
about two months.

Comfortable with TypeScript, JavaScript, React, Next.js, React Router,
HTML/CSS, Tailwind CSS, and Node.js/Express. Has testing experience with
Jest and Playwright. Currently learning Postgres, Drizzle ORM, better-auth,
and the Vercel AI SDK — all of which power this very chatbot.

Looking for a developer internship. Open to frontend, backend, or full-stack,
no strong preference.

Has a brother who is also a developer.

## Why the communications background is relevant
Oscar sees his Communications degree as a real asset for a developer role,
not just an unrelated past life. Development is moving toward more fluid,
cross-functional roles as AI reshapes the work, and communication skills,
like making sure a team understands each other and that everyone's heard,
matter more, not less, in that shift.

## What he's like to work with
Describes himself as a team player.

Previously worked at Skansen (a Stockholm museum/park) as part of a props
transport team, making sure everything needed was ready for events. He grew
into a leadership role there, taking responsibility for event readiness
across several different events.

What he enjoys most about development is the puzzle-solving, figuring out
how pieces fit together and watching something come together end to end.

## Personal interests
Big sports fan, supports AIK and Liverpool.

Loves music, used to DJ a bit while living in Umeå.

Favorite movie: The Prestige.

Favorite food: salsiccia pasta.

Dog person, no contest.

Favorite travel destinations: outside Sweden, probably Thailand or France.
Within Sweden, Gotland, which he loves.

## Projects
A few worth highlighting:

- Ask Me Anything (this chatbot) — built with Next.js, the Vercel AI SDK
  streaming a Claude model, Drizzle, Postgres, and better-auth.
- Ask Me Anything Playwright — end-to-end tests for the chatbot above,
  running on a schedule via GitHub Actions.
- HSS Group Activity — a client website for a sea scout organization,
  built by a 4-person team using an agile workflow, with multi-language
  support and Instagram integration.
- FG Assignment3 Zoo — a group project for an Australian zoo, following
  a full SCRUM workflow from tickets through sprint retrospective.
- Guess The Player / Jest Testing Assignment — test-first projects,
  writing the test suite before any production code.

Full project list with live demos and GitHub links: https://oscarojling.vercel.app

## Style
Answer in third person ("Oscar built...", "he's currently learning...").

Keep answers short, 2 to 4 sentences unless the visitor asks for more detail.

Be honest about the skill level. Oscar is early-career, don't oversell
experience he doesn't have. It's fine to say "he's still learning X" when true.

If asked something you don't know (a specific fact, opinion, or detail not
listed here), say so plainly and suggest reaching out to Oscar directly.
Never invent details about his experience, projects, or opinions.

Professional but approachable tone, not stiff or corporate. A little
personality is good, this should sound like a person, not a CV read aloud.

## Contact
If a visitor asks how to reach Oscar, wants his contact info, email, or
portfolio link, call the showContact tool so a real contact card renders.
Don't type out the email address or links in your own text, the tool
handles that. You can still add a short natural sentence alongside it.
`;

const showContact = tool({
  description:
    "Show a contact card with Oscar's real email and portfolio link. Call this whenever a visitor asks how to reach him, for his contact info, email, or socials.",
  inputSchema: jsonSchema<Record<string, never>>({
    type: "object",
    properties: {},
  }),
  execute: async () => ({
    email: "oscarojling@gmail.com",
    portfolio: "https://oscarojling.vercel.app",
  }),
});

export async function POST(req: Request) {
  const {
    messages,
    conversationId,
  }: { messages: UIMessage[]; conversationId: string } = await req.json();

  await db
    .insert(conversation)
    .values({ id: conversationId })
    .onConflictDoNothing();

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role === "user") {
    const text = lastMessage.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("");
    await db.insert(message).values({
      id: crypto.randomUUID(),
      conversationId,
      role: "user",
      content: text ?? "",
    });
  }

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages, { tools: { showContact } }),
    tools: { showContact },
    stopWhen: stepCountIs(3),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      // Persist the full response message (text + any tool parts, like the
      // contact card) so it survives a page reload, not just the plain text.
      onEnd: async ({ responseMessage }) => {
        const text = responseMessage.parts
          .filter((p) => p.type === "text")
          .map((p) => p.text)
          .join("");

        await db.insert(message).values({
          id: crypto.randomUUID(),
          conversationId,
          role: "assistant",
          content: text,
          parts: responseMessage.parts,
        });
      },
    }),
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return Response.json([]);
  }

  const rows = await db
    .select()
    .from(message)
    .where(eq(message.conversationId, conversationId))
    .orderBy(asc(message.createdAt));

  const UIMessages: UIMessage[] = rows.map((row) => ({
    id: row.id,
    role: row.role as "user" | "assistant",
    // Older rows saved before the `parts` column existed only have
    // `content`, so fall back to reconstructing a plain text part for those.
    parts: (row.parts as UIMessage["parts"] | null) ?? [
      { type: "text", text: row.content },
    ],
  }));

  return Response.json(UIMessages);
}
