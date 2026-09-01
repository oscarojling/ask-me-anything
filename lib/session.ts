export function getConversationId(): string {
  const existing = localStorage.getItem("conversation-id");
  if (existing) return existing;

  const newId = crypto.randomUUID();
  localStorage.setItem("conversation-id", newId);
  return newId;
}
