export interface KubernetesCluster {
  id: string;
  name: string;
  context: string;
  status: "connected" | "disconnected" | "error";
  version: string;
  nodes: number;
  lastSync: Date;
}

export interface GitRepository {
  id: string;
  name: string;
  url: string;
  branch: string;
  status: "synced" | "syncing" | "error";
  lastSync: Date;
}

export interface ManifestFile {
  path: string;
  name: string;
  type: "deployment" | "service" | "configmap" | "secret" | "other";
  lastModified: Date;
  content: string;
}

export interface AgentMessage {
  id: string;
  content: string;
  type: "user" | "agent";
  timestamp: Date;
  metadata?: {
    relatedFiles?: string[];
    suggestedActions?: string[];
    clusterContext?: string;
  };
}
