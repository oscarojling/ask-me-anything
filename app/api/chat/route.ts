import { anthropic } from "@ai-sdk/anthropic";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
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

About 1-2 years of coding experience total. Comfortable with TypeScript,
JavaScript, React, Next.js, jQuery, HTML, CSS, and Node.js.

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
`;

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
    messages: await convertToModelMessages(messages),
    onFinish: async ({ text }) => {
      await db.insert(message).values({
        id: crypto.randomUUID(),
        conversationId,
        role: "assistant",
        content: text,
      });
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
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
    parts: [{ type: "text", text: row.content }],
  }));

  return Response.json(UIMessages);
}
