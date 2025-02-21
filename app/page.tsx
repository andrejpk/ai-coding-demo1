"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CodeEditor from "../components/editor/Editor";
import { TreeNode } from "../components/explorer/TreeView";
import MainLayout from "../components/layout/MainLayout";

function getPathParts(path: string): string[] {
  return path.split("/").filter(Boolean);
}

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  return (
    <MainLayout onFileSelect={setSelectedNode}>
      <div className="h-full flex flex-col">
        <header className="bg-gray-800 py-1.5 px-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            {/* Title - only show on larger screens or when no file is selected */}
            <h1
              className={`font-bold ${
                selectedNode && selectedNode.type !== "folder"
                  ? "text-lg md:text-xl hidden md:block"
                  : "text-xl md:text-2xl"
              } text-gray-100 truncate`}
            >
              Kubernetes Automation Agent
            </h1>

            {/* File path as breadcrumbs */}
            {selectedNode && selectedNode.type !== "folder" && (
              <div className="flex items-center ml-3 text-sm text-gray-400 min-w-0">
                <span className="md:hidden">📄</span>
                <div className="flex items-center overflow-hidden">
                  {getPathParts(selectedNode.path).map((part, index, array) => (
                    <span key={index} className="flex items-center min-w-0">
                      {index > 0 && (
                        <span className="mx-1 text-gray-600">/</span>
                      )}
                      <span
                        className={`truncate ${
                          index === array.length - 1
                            ? "text-blue-400 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {part}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              className="p-1.5 text-gray-400 hover:text-gray-100 rounded-lg hover:bg-gray-700"
              onClick={() => {
                const event = new CustomEvent("toggleLeftPanel");
                window.dispatchEvent(event);
              }}
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-grow overflow-hidden">
          <CodeEditor selectedNode={selectedNode} />
        </main>
      </div>
    </MainLayout>
  );
}
