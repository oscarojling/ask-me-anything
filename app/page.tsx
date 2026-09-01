"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

import { Conversation, ConversationContent, ConversationEmptyState } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputSubmit } from "@/components/ai-elements/prompt-input";

export default function Home() {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted"
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
