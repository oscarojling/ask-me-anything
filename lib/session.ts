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
