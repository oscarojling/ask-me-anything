import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { conversation, message } from "@/db/schema";
import { desc, eq, count } from "drizzle-orm";
import { LoginForm } from "./login-form";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return <LoginForm />;
  }

  const conversations = await db
    .select({
      id: conversation.id,
      createdAt: conversation.createdAt,
      messageCount: count(message.id),
    })
    .from(conversation)
    .leftJoin(message, eq(message.conversationId, conversation.id))
    .groupBy(conversation.id)
    .orderBy(desc(conversation.createdAt));

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Conversations</h1>
      <div className="flex flex-col gap-2">
        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/admin/${c.id}`}
            className="border rounded px-4 py-3 hover:bg-gray-50 flex justify-between"
          >
            <span className="text-sm text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </span>
            <span className="text-sm">{c.messageCount} messages</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
