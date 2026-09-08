"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { UIMessage } from "ai";
import { ArrowUpRight } from "lucide-react";
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
    <div className="flex flex-col h-dvh">
      <header className="px-4 sm:px-6 pt-6 pb-2 max-w-2xl mx-auto w-full">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-3xl tracking-tight">
            Ask Oscar Anything
          </h1>
          <a
            href="https://oscarojling.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground visited:text-muted-foreground hover:text-primary visited:hover:text-primary transition-colors"
          >
            Portfolio
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
        <div className="mt-2 h-px w-16 bg-primary" />
      </header>
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
                    <span className="flex gap-2">
                      <span className="font-display italic text-3xl text-primary leading-none select-none">
                        &ldquo;
                      </span>
                      <span>
                        {message.parts?.map(
                          (part) => part.type === "text" && part.text,
                        )}
                      </span>
                    </span>
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
          <PromptInputSubmit
            disabled={isLoading || !conversationId}
            suppressHydrationWarning
          />
        </PromptInput>
      </div>
    </div>
  );
}
