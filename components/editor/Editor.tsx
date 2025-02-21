"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { TreeNode } from "../explorer/TreeView";

interface CodeEditorProps {
  selectedNode: TreeNode | null;
}

export default function CodeEditor({ selectedNode }: CodeEditorProps) {
  const [content, setContent] = useState<string>("");
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // Configure Monaco for YAML
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });

      // Set VS Code-like editor options
      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1e1e1e",
          "editor.foreground": "#d4d4d4",
          "editor.lineHighlightBackground": "#2a2a2a",
          "editor.selectionBackground": "#264f78",
          "editor.inactiveSelectionBackground": "#3a3d41",
        },
      });
    }
  }, [monaco]);

  useEffect(() => {
    if (selectedNode?.type !== "folder") {
      // In a real app, fetch the file content here
      // For now, we'll use mock content
      const mockContent = selectedNode ? getMockContent(selectedNode) : "";
      setContent(mockContent);
    }
  }, [selectedNode]);

  if (!selectedNode || selectedNode.type === "folder") {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <p>Select a file to edit</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="yaml"
        theme="custom-dark"
        value={content}
        onChange={(value) => setContent(value || "")}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          scrollbar: {
            useShadows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
      />
    </div>
  );
}

function getMockContent(node: TreeNode): string {
  switch (node.path) {
    case "/clusters/production/flux-system/kustomization.yaml":
      return `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - gotk-components.yaml
  - gotk-sync.yaml`;

    case "/clusters/production/apps/deployments/web-app.yaml":
      return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: nginx:latest
        ports:
        - containerPort: 80`;

    case "/clusters/production/apps/helm-releases/prometheus.yaml":
      return `apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: prometheus
  namespace: monitoring
spec:
  interval: 5m
  chart:
    spec:
      chart: prometheus
      version: '15.x'
      sourceRef:
        kind: HelmRepository
        name: prometheus-community
        namespace: flux-system
  values:
    alertmanager:
      enabled: true`;

    default:
      return "# New File";
  }
}
