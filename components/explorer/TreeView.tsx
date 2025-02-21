"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CircleStackIcon,
  CloudIcon,
  CommandLineIcon,
  CubeIcon,
  DocumentIcon,
  FolderIcon,
  LockClosedIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export interface TreeNode {
  id: string;
  name: string;
  type:
    | "folder"
    | "deployment"
    | "service"
    | "configmap"
    | "secret"
    | "kustomization"
    | "helmrelease"
    | "gitrepository"
    | "yaml"
    | "other";
  children?: TreeNode[];
  path: string;
}

interface TreeViewProps {
  node: TreeNode;
  level?: number;
  onSelect?: (node: TreeNode) => void;
}

interface TreeViewItemProps extends TreeViewProps {
  isExpanded: boolean;
  onToggle: () => void;
}

function IconForType({ type }: { type: TreeNode["type"] }) {
  const baseClass = "w-4 h-4 stroke-[1.5]";

  const colorClass = (() => {
    switch (type) {
      case "folder":
      case "gitrepository":
        return "text-resource-folder";
      case "deployment":
      case "service":
        return "text-resource-workload";
      case "configmap":
      case "secret":
        return "text-resource-config";
      case "kustomization":
      case "helmrelease":
        return "text-resource-deployment";
      default:
        return "text-resource-default";
    }
  })();

  const className = `${baseClass} ${colorClass}`;

  switch (type) {
    case "folder":
      return <FolderIcon className={className} />;
    case "deployment":
      return <CubeIcon className={className} />;
    case "service":
      return <CircleStackIcon className={className} />;
    case "configmap":
      return <WrenchIcon className={className} />;
    case "secret":
      return <LockClosedIcon className={className} />;
    case "kustomization":
      return <CommandLineIcon className={className} />;
    case "helmrelease":
      return <CloudIcon className={className} />;
    case "gitrepository":
      return <FolderIcon className={className} />;
    case "yaml":
    case "other":
      return <DocumentIcon className={className} />;
  }
}

function TreeViewItem({
  node,
  level = 0,
  onSelect,
  isExpanded,
  onToggle,
}: TreeViewItemProps) {
  const paddingLeft = `${level * 0.75}rem`;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative group" style={{ paddingLeft }}>
      <div
        className={`flex items-center py-0.5 px-1 hover:bg-gray-800 rounded cursor-pointer group-hover:bg-opacity-50 ${
          hasChildren ? "hover:bg-opacity-75" : ""
        }`}
        onClick={() => {
          if (hasChildren) {
            onToggle();
          }
          onSelect?.(node);
        }}
      >
        <span className="flex items-center w-full">
          {hasChildren ? (
            <span className="w-3 h-3 mr-0.5 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDownIcon className="w-2.5 h-2.5 text-gray-400 stroke-2" />
              ) : (
                <ChevronRightIcon className="w-2.5 h-2.5 text-gray-400 stroke-2" />
              )}
            </span>
          ) : (
            <span className="w-3 h-3 mr-0.5" />
          )}
          <span className="mr-1 flex items-center">
            <IconForType type={node.type} />
          </span>
          <span className="text-sm truncate">{node.name}</span>
        </span>
      </div>
    </div>
  );
}

export default function TreeView({ node, level = 0, onSelect }: TreeViewProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set([node.id])
  );

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const isExpanded = expandedNodes.has(node.id);

  return (
    <div>
      <TreeViewItem
        node={node}
        level={level}
        onSelect={onSelect}
        isExpanded={isExpanded}
        onToggle={() => toggleNode(node.id)}
      />
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeView
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
