"use client";

import {
  ArrowPathIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { TreeNode } from "../explorer/TreeView";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  references?: {
    file?: TreeNode;
    lineStart?: number;
    lineEnd?: number;
  }[];
}

interface ChatWindowProps {
  onFileSelect?: (node: TreeNode) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ChatWindow({
  onFileSelect,
  isExpanded,
  onToggleExpand,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // TODO: Replace with actual AI processing
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "This is a sample response with a file reference.",
        timestamp: new Date(),
        references: [
          {
            file: {
              id: "sample",
              name: "web-app.yaml",
              type: "deployment",
              path: "/clusters/production/apps/deployments/web-app.yaml",
            },
            lineStart: 1,
            lineEnd: 5,
          },
        ],
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const FileReference = ({
    reference,
  }: {
    reference: NonNullable<ChatMessage["references"]>[0];
  }) => (
    <div
      className="mt-2 p-2 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:bg-gray-750"
      onClick={() => reference.file && onFileSelect?.(reference.file)}
    >
      <div className="flex items-center text-sm">
        <span className="text-blue-400">📄 {reference.file?.name}</span>
        {reference.lineStart && reference.lineEnd && (
          <span className="ml-2 text-gray-400">
            Lines {reference.lineStart}-{reference.lineEnd}
          </span>
        )}
      </div>
      <div className="text-xs text-gray-500 truncate">
        {reference.file?.path}
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col h-full ${
        isExpanded ? "fixed inset-0 z-50 bg-gray-900" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100">AI Agent</h2>
        <button
          onClick={onToggleExpand}
          className="p-1.5 text-gray-400 hover:text-gray-100 rounded-lg hover:bg-gray-700"
        >
          {isExpanded ? (
            <ArrowsPointingInIcon className="w-5 h-5" />
          ) : (
            <ArrowsPointingOutIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-100"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.references?.map((ref, index) => (
                <FileReference key={index} reference={ref} />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isProcessing ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
