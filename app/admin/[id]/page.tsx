import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { message } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { LoginForm } from "../login-form";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <LoginForm />;
  }

  const { id } = await params;

  const messages = await db
    .select()
    .from(message)
    .where(eq(message.conversationId, id))
    .orderBy(asc(message.createdAt));

  return (
    <div className="max-w-2xl mx-auto p-8">
      <a href="/admin" className="text-sm text-blue-600">
        ← Back
      </a>
      <div className="flex flex-col gap-4 mt-6">
        {messages.map((m) => (
          <div key={m.id}>
            <p className="text-xs text-gray-400 mb-1">{m.role}</p>
            <p className="text-sm">{m.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
