import { KubernetesService } from "@/lib/services/kubernetesService";
import {
  DatabaseError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/errors";
import { describe, expect, it } from "vitest";
import { prismaMock } from "../helpers/prisma.mock";

describe("KubernetesService", () => {
  const service = new KubernetesService();
  const mockCluster = {
    id: "test-id",
    name: "test-cluster",
    context: "test-context",
    status: "connected",
    version: "v1.25.0",
    nodes: 3,
    lastSync: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe("getClusters", () => {
    it("should return all clusters", async () => {
      prismaMock.kubernetesCluster.findMany.mockResolvedValue([mockCluster]);

      const result = await service.getClusters();
      expect(result).toEqual([mockCluster]);
      expect(prismaMock.kubernetesCluster.findMany).toHaveBeenCalledWith({
        orderBy: { name: "asc" },
      });
    });

    it("should handle database errors", async () => {
      prismaMock.kubernetesCluster.findMany.mockRejectedValue(
        new Error("DB error")
      );

      await expect(service.getClusters()).rejects.toThrow(DatabaseError);
    });
  });

  describe("getCluster", () => {
    it("should return a cluster by id", async () => {
      prismaMock.kubernetesCluster.findUnique.mockResolvedValue(mockCluster);

      const result = await service.getCluster("test-id");
      expect(result).toEqual(mockCluster);
      expect(prismaMock.kubernetesCluster.findUnique).toHaveBeenCalledWith({
        where: { id: "test-id" },
      });
    });

    it("should throw ValidationError if id is missing", async () => {
      await expect(service.getCluster("")).rejects.toThrow(ValidationError);
    });

    it("should throw NotFoundError if cluster does not exist", async () => {
      prismaMock.kubernetesCluster.findUnique.mockResolvedValue(null);

      await expect(service.getCluster("non-existent")).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe("createCluster", () => {
    const createData = {
      name: "new-cluster",
      context: "new-context",
      status: "connected",
      version: "v1.26.0",
      nodes: 5,
      lastSync: new Date(),
    };

    it("should create a new cluster", async () => {
      prismaMock.kubernetesCluster.create.mockResolvedValue({
        ...mockCluster,
        ...createData,
      });

      const result = await service.createCluster(createData);
      expect(result).toMatchObject(createData);
      expect(prismaMock.kubernetesCluster.create).toHaveBeenCalledWith({
        data: createData,
      });
    });

    it("should throw ValidationError if required fields are missing", async () => {
      await expect(
        service.createCluster({ ...createData, name: "" })
      ).rejects.toThrow(ValidationError);
      await expect(
        service.createCluster({ ...createData, context: "" })
      ).rejects.toThrow(ValidationError);
    });

    it("should handle database errors", async () => {
      prismaMock.kubernetesCluster.create.mockRejectedValue(
        new Error("DB error")
      );

      await expect(service.createCluster(createData)).rejects.toThrow(
        DatabaseError
      );
    });
  });

  describe("updateCluster", () => {
    const updateData = {
      name: "updated-cluster",
      nodes: 7,
    };

    it("should update a cluster", async () => {
      prismaMock.kubernetesCluster.update.mockResolvedValue({
        ...mockCluster,
        ...updateData,
      });

      const result = await service.updateCluster("test-id", updateData);
      expect(result).toMatchObject(updateData);
      expect(prismaMock.kubernetesCluster.update).toHaveBeenCalledWith({
        where: { id: "test-id" },
        data: updateData,
      });
    });

    it("should throw ValidationError if id is missing", async () => {
      await expect(service.updateCluster("", updateData)).rejects.toThrow(
        ValidationError
      );
    });

    it("should handle database errors", async () => {
      prismaMock.kubernetesCluster.update.mockRejectedValue(
        new Error("DB error")
      );

      await expect(
        service.updateCluster("test-id", updateData)
      ).rejects.toThrow(DatabaseError);
    });
  });

  describe("deleteCluster", () => {
    it("should delete a cluster", async () => {
      prismaMock.kubernetesCluster.delete.mockResolvedValue(mockCluster);

      const result = await service.deleteCluster("test-id");
      expect(result).toEqual(mockCluster);
      expect(prismaMock.kubernetesCluster.delete).toHaveBeenCalledWith({
        where: { id: "test-id" },
      });
    });

    it("should throw ValidationError if id is missing", async () => {
      await expect(service.deleteCluster("")).rejects.toThrow(ValidationError);
    });

    it("should handle database errors", async () => {
      prismaMock.kubernetesCluster.delete.mockRejectedValue(
        new Error("DB error")
      );

      await expect(service.deleteCluster("test-id")).rejects.toThrow(
        DatabaseError
      );
    });
  });
});
