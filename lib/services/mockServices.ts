import {
  AgentMessage,
  GitRepository,
  KubernetesCluster,
  ManifestFile,
} from "./types";

export class MockKubernetesService {
  private clusters: KubernetesCluster[] = [
    {
      id: "cluster-1",
      name: "development-cluster",
      context: "dev-context",
      status: "connected",
      version: "v1.25.0",
      nodes: 3,
      lastSync: new Date(),
    },
    {
      id: "cluster-2",
      name: "production-cluster",
      context: "prod-context",
      status: "connected",
      version: "v1.24.0",
      nodes: 5,
      lastSync: new Date(),
    },
  ];

  async getClusters(): Promise<KubernetesCluster[]> {
    return this.clusters;
  }

  async getCluster(id: string): Promise<KubernetesCluster | null> {
    return this.clusters.find((c) => c.id === id) || null;
  }
}

export class MockGitService {
  private repos: GitRepository[] = [
    {
      id: "repo-1",
      name: "kubernetes-manifests",
      url: "https://github.com/org/kubernetes-manifests",
      branch: "main",
      status: "synced",
      lastSync: new Date(),
    },
  ];

  private manifests: ManifestFile[] = [
    {
      path: "/deployments/web-app.yaml",
      name: "web-app.yaml",
      type: "deployment",
      lastModified: new Date(),
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: web-app
        image: nginx:latest`,
    },
  ];

  async getRepositories(): Promise<GitRepository[]> {
    return this.repos;
  }

  async getManifests(repoId: string): Promise<ManifestFile[]> {
    return this.manifests;
  }
}

export class MockAgentService {
  private messages: AgentMessage[] = [];

  async sendMessage(content: string): Promise<AgentMessage> {
    const userMessage: AgentMessage = {
      id: Date.now().toString(),
      content,
      type: "user",
      timestamp: new Date(),
    };

    const agentMessage: AgentMessage = {
      id: (Date.now() + 1).toString(),
      content: "This is a mock response from the agent.",
      type: "agent",
      timestamp: new Date(),
      metadata: {
        suggestedActions: ["View manifest", "Apply changes"],
        relatedFiles: ["/deployments/web-app.yaml"],
      },
    };

    this.messages.push(userMessage, agentMessage);
    return agentMessage;
  }

  async getMessageHistory(): Promise<AgentMessage[]> {
    return this.messages;
  }
}
