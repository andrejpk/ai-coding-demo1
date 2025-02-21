import { agentService } from "@/lib/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const messages = await agentService.getMessageHistory();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { content, metadata } = await request.json();
    const message = await agentService.sendMessage(content, metadata);
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
