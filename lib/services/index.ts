export * from "./agentService";
export * from "./gitService";
export * from "./kubernetesService";

// Create singleton instances
import { AgentService } from "./agentService";
import { GitService } from "./gitService";
import { KubernetesService } from "./kubernetesService";

export const kubernetesService = new KubernetesService();
export const gitService = new GitService();
export const agentService = new AgentService();
