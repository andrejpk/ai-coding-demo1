"use client";

import { useState } from "react";
import TreeView, { TreeNode } from "./TreeView";

type Tab = "files" | "clusters";

const sampleFileTree: TreeNode = {
  id: "root",
  name: "flux-system",
  type: "folder",
  path: "/",
  children: [
    {
      id: "clusters",
      name: "clusters",
      type: "folder",
      path: "/clusters",
      children: [
        {
          id: "production",
          name: "production",
          type: "folder",
          path: "/clusters/production",
          children: [
            {
              id: "flux-system",
              name: "flux-system",
              type: "folder",
              path: "/clusters/production/flux-system",
              children: [
                {
                  id: "gotk-components.yaml",
                  name: "gotk-components.yaml",
                  type: "yaml",
                  path: "/clusters/production/flux-system/gotk-components.yaml",
                },
                {
                  id: "kustomization.yaml",
                  name: "kustomization.yaml",
                  type: "kustomization",
                  path: "/clusters/production/flux-system/kustomization.yaml",
                },
              ],
            },
            {
              id: "apps",
              name: "apps",
              type: "folder",
              path: "/clusters/production/apps",
              children: [
                {
                  id: "helm-releases",
                  name: "helm-releases",
                  type: "folder",
                  path: "/clusters/production/apps/helm-releases",
                  children: [
                    {
                      id: "prometheus.yaml",
                      name: "prometheus.yaml",
                      type: "helmrelease",
                      path: "/clusters/production/apps/helm-releases/prometheus.yaml",
                    },
                  ],
                },
                {
                  id: "deployments",
                  name: "deployments",
                  type: "folder",
                  path: "/clusters/production/apps/deployments",
                  children: [
                    {
                      id: "web-app.yaml",
                      name: "web-app.yaml",
                      type: "deployment",
                      path: "/clusters/production/apps/deployments/web-app.yaml",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

interface ExplorerProps {
  onSelect?: (node: TreeNode | null) => void;
}

export default function Explorer({ onSelect }: ExplorerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("files");

  const handleNodeSelect = (node: TreeNode) => {
    onSelect?.(node);
  };

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
          <div className="py-2">
            <TreeView node={sampleFileTree} onSelect={handleNodeSelect} />
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
