export function getConversationId(): string {
  try {
    const existing = localStorage.getItem("conversation-id");
    if (existing) return existing;

    const newId = crypto.randomUUID();
    localStorage.setItem("conversation-id", newId);
    return newId;
  } catch {
    return crypto.randomUUID();
  }
}

export function startNewConversation(): string {
  const newId = crypto.randomUUID();
  try {
    localStorage.setItem("conversation-id", newId);
  } catch {
    // e.g. private browsing with storage disabled — the id just won't persist
  }
  return newId;
}
