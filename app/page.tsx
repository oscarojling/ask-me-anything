"use client";

import { useChat } from "@ai-sdk/react";

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Ask me anything</h1>

      <div className="mb-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.role === "user" ? "You" : "Bot"}:</strong>
            {""}
            {message.parts.map((part, i) =>
              part.type === "text" ? <span key={i}>{part.text}</span> : null,
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem(
            "promt",
          ) as HTMLInputElement;
          if (input.value.trim()) {
            sendMessage({ text: input.value });
            input.value = "";
          }
        }}
      >
        <input
          name="promt"
          placeholder="Ask something..."
          disabled={status !== "ready"}
          className="w-full border border-gray-300 rounded px-3 py-2 disabled:opacity-50"
        />
      </form>
    </main>
  );
}
