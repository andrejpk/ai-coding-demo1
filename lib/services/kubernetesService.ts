import { KubernetesCluster } from "@prisma/client";
import { DatabaseError, NotFoundError, ValidationError } from "../utils/errors";
import { logger } from "../utils/logger";
import { prisma } from "./prisma";

export class KubernetesService {
  async getClusters(): Promise<KubernetesCluster[]> {
    try {
      logger.debug("Fetching all Kubernetes clusters");
      return await prisma.kubernetesCluster.findMany({
        orderBy: { name: "asc" },
      });
    } catch (error) {
      logger.error("Failed to fetch Kubernetes clusters", error as Error);
      throw new DatabaseError("Failed to fetch Kubernetes clusters", error);
    }
  }

  async getCluster(id: string): Promise<KubernetesCluster | null> {
    if (!id) {
      throw new ValidationError("Cluster ID is required");
    }

    try {
      logger.debug("Fetching Kubernetes cluster", { clusterId: id });
      const cluster = await prisma.kubernetesCluster.findUnique({
        where: { id },
      });

      if (!cluster) {
        throw new NotFoundError(`Kubernetes cluster not found: ${id}`);
      }

      return cluster;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      logger.error("Failed to fetch Kubernetes cluster", error as Error, {
        clusterId: id,
      });
      throw new DatabaseError("Failed to fetch Kubernetes cluster", error);
    }
  }

  async createCluster(
    data: Omit<KubernetesCluster, "id" | "createdAt" | "updatedAt">
  ): Promise<KubernetesCluster> {
    // Validate required fields
    if (!data.name || !data.context) {
      throw new ValidationError("Cluster name and context are required");
    }

    try {
      logger.debug("Creating new Kubernetes cluster", { clusterData: data });
      return await prisma.kubernetesCluster.create({
        data: {
          ...data,
          lastSync: data.lastSync || new Date(),
        },
      });
    } catch (error) {
      logger.error("Failed to create Kubernetes cluster", error as Error, {
        clusterData: data,
      });
      throw new DatabaseError("Failed to create Kubernetes cluster", error);
    }
  }

  async updateCluster(
    id: string,
    data: Partial<Omit<KubernetesCluster, "id" | "createdAt" | "updatedAt">>
  ): Promise<KubernetesCluster> {
    if (!id) {
      throw new ValidationError("Cluster ID is required");
    }

    try {
      logger.debug("Updating Kubernetes cluster", {
        clusterId: id,
        updateData: data,
      });
      return await prisma.kubernetesCluster.update({
        where: { id },
        data,
      });
    } catch (error) {
      logger.error("Failed to update Kubernetes cluster", error as Error, {
        clusterId: id,
        updateData: data,
      });
      throw new DatabaseError("Failed to update Kubernetes cluster", error);
    }
  }

  async deleteCluster(id: string): Promise<KubernetesCluster> {
    if (!id) {
      throw new ValidationError("Cluster ID is required");
    }

    try {
      logger.debug("Deleting Kubernetes cluster", { clusterId: id });
      return await prisma.kubernetesCluster.delete({
        where: { id },
      });
    } catch (error) {
      logger.error("Failed to delete Kubernetes cluster", error as Error, {
        clusterId: id,
      });
      throw new DatabaseError("Failed to delete Kubernetes cluster", error);
    }
  }
}
