"use client";

import { useState } from "react";

type Tab = "files" | "clusters";

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<Tab>("files");

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        <button
          className={`px-4 py-2 ${
            activeTab === "files"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("files")}
        >
          Files
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "clusters"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("clusters")}
        >
          Clusters
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto">
        {activeTab === "files" ? (
          <div className="p-2">
            {/* File explorer content will go here */}
            <div className="text-gray-400">No repositories connected</div>
          </div>
        ) : (
          <div className="p-2">
            {/* Cluster explorer content will go here */}
            <div className="text-gray-400">No clusters connected</div>
          </div>
        )}
      </div>
    </div>
  );
}
