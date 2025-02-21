import { AgentMessage } from "@prisma/client";
import { prisma } from "./prisma";

export class AgentService {
  async sendMessage(
    content: string,
    metadata?: {
      relatedFiles?: string[];
      suggestedActions?: string[];
      clusterContext?: string;
    }
  ): Promise<AgentMessage> {
    // Create user message
    const userMessage = await prisma.agentMessage.create({
      data: {
        content,
        type: "user",
        timestamp: new Date(),
        relatedFiles: metadata?.relatedFiles
          ? JSON.stringify(metadata.relatedFiles)
          : null,
        suggestedActions: metadata?.suggestedActions
          ? JSON.stringify(metadata.suggestedActions)
          : null,
        clusterContext: metadata?.clusterContext,
      },
    });

    // Create agent response (this is a placeholder - in reality, this would involve AI processing)
    const agentMessage = await prisma.agentMessage.create({
      data: {
        content: "This is a response from the agent.",
        type: "agent",
        timestamp: new Date(),
        relatedFiles: metadata?.relatedFiles
          ? JSON.stringify(metadata.relatedFiles)
          : null,
        suggestedActions: JSON.stringify(["View manifest", "Apply changes"]),
        clusterContext: metadata?.clusterContext,
      },
    });

    return agentMessage;
  }

  async getMessageHistory(): Promise<AgentMessage[]> {
    return prisma.agentMessage.findMany({
      orderBy: { timestamp: "asc" },
    });
  }

  async getMessage(id: string): Promise<AgentMessage | null> {
    return prisma.agentMessage.findUnique({
      where: { id },
    });
  }

  async deleteMessage(id: string): Promise<AgentMessage> {
    return prisma.agentMessage.delete({
      where: { id },
    });
  }

  // Helper methods to handle JSON serialization/deserialization
  getRelatedFiles(message: AgentMessage): string[] {
    try {
      return message.relatedFiles ? JSON.parse(message.relatedFiles) : [];
    } catch {
      return [];
    }
  }

  getSuggestedActions(message: AgentMessage): string[] {
    try {
      return message.suggestedActions
        ? JSON.parse(message.suggestedActions)
        : [];
    } catch {
      return [];
    }
  }
}
