import { KubernetesCluster } from "@prisma/client";
import { useEffect, useState } from "react";
import { logger } from "../utils/logger";

interface ErrorResponse {
  message: string;
  code: string;
  details?: unknown;
}

export function useClusters() {
  const [clusters, setClusters] = useState<KubernetesCluster[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    async function fetchClusters() {
      try {
        logger.debug("Fetching clusters from API");
        const response = await fetch("/api/clusters");
        const data = await response.json();

        if (!response.ok) {
          throw data.error;
        }

        setClusters(data);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        logger.error("Error fetching clusters", err as Error);
        setError({
          message: errorMessage,
          code: "FETCH_ERROR",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchClusters();
  }, []);

  const createCluster = async (
    data: Omit<KubernetesCluster, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      logger.debug("Creating new cluster", { clusterData: data });
      const response = await fetch("/api/clusters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw responseData.error;
      }

      setClusters((prev) => [...prev, responseData]);
      return responseData;
    } catch (err) {
      logger.error("Error creating cluster", err as Error);
      throw err instanceof Error ? err : new Error("Failed to create cluster");
    }
  };

  const refreshClusters = async () => {
    setIsLoading(true);
    try {
      logger.debug("Refreshing clusters");
      const response = await fetch("/api/clusters");
      const data = await response.json();

      if (!response.ok) {
        throw data.error;
      }

      setClusters(data);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      logger.error("Error refreshing clusters", err as Error);
      setError({
        message: errorMessage,
        code: "REFRESH_ERROR",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    clusters,
    isLoading,
    error,
    createCluster,
    refreshClusters,
  };
}
