import { AgentMessage } from "@prisma/client";
import { useEffect, useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/api/chat");
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const sendMessage = async (
    content: string,
    metadata?: {
      relatedFiles?: string[];
      suggestedActions?: string[];
      clusterContext?: string;
    }
  ) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, metadata }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const newMessage = await response.json();
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to send message");
    }
  };

  // Helper functions to parse JSON fields
  const getRelatedFiles = (message: AgentMessage): string[] => {
    try {
      return message.relatedFiles ? JSON.parse(message.relatedFiles) : [];
    } catch {
      return [];
    }
  };

  const getSuggestedActions = (message: AgentMessage): string[] => {
    try {
      return message.suggestedActions
        ? JSON.parse(message.suggestedActions)
        : [];
    } catch {
      return [];
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    getRelatedFiles,
    getSuggestedActions,
  };
}
