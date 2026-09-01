"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { UIMessage } from "ai";
import { getConversationId } from "@/lib/session";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";

export default function Home() {
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { messages, sendMessage, status, setMessages } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    const id = getConversationId();
    setConversationId(id);

    fetch(`/api/chat?conversationId=${id}`)
      .then((res) => res.json())
      .then((past: UIMessage[]) => {
        if (past.length > 0) setMessages(past);
        setIsLoaded(true);
      });
  }, [setMessages]);

  return (
    <div className="flex flex-col h-screen">
      <Conversation>
        <ConversationContent className="px-4 sm:px-6 max-w-2xl mx-auto w-full">
          {isLoaded && messages.length === 0 ? (
            <ConversationEmptyState
              title="Ask me anything"
              description="Questions about Oscar - background, skills, projects"
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent className="text-lg leading-relaxed">
                  {message.role === "assistant" ? (
                    <MessageResponse>
                      {message.parts
                        ?.filter((part) => part.type === "text")
                        .map((part) => part.text)
                        .join("")}
                    </MessageResponse>
                  ) : (
                    message.parts?.map(
                      (part) => part.type === "text" && part.text,
                    )
                  )}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
      </Conversation>
      <div className="border-t p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <PromptInput
          onSubmit={(message, event) => {
            event.preventDefault();
            if (message.text && conversationId) {
              sendMessage({ text: message.text }, { body: { conversationId } });
              setInput("");
            }
          }}
          className="max-w-2xl mx-auto flex gap-2 items-end"
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about Oscar..."
            disabled={isLoading}
            rows={1}
            className="flex-1 text-lg"
          />
          <PromptInputSubmit disabled={isLoading || !conversationId} suppressHydrationWarning />
        </PromptInput>
      </div>
    </div>
  );
}
