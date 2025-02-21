import { GitRepository, ManifestFile } from "@prisma/client";
import { prisma } from "./prisma";

export class GitService {
  async getRepositories(): Promise<GitRepository[]> {
    return prisma.gitRepository.findMany({
      orderBy: { name: "asc" },
      include: { manifests: true },
    });
  }

  async getRepository(id: string): Promise<GitRepository | null> {
    return prisma.gitRepository.findUnique({
      where: { id },
      include: { manifests: true },
    });
  }

  async createRepository(
    data: Omit<GitRepository, "id" | "createdAt" | "updatedAt">
  ): Promise<GitRepository> {
    return prisma.gitRepository.create({
      data: {
        ...data,
        lastSync: data.lastSync || new Date(),
      },
      include: { manifests: true },
    });
  }

  async updateRepository(
    id: string,
    data: Partial<Omit<GitRepository, "id" | "createdAt" | "updatedAt">>
  ): Promise<GitRepository> {
    return prisma.gitRepository.update({
      where: { id },
      data,
      include: { manifests: true },
    });
  }

  async deleteRepository(id: string): Promise<GitRepository> {
    return prisma.gitRepository.delete({
      where: { id },
      include: { manifests: true },
    });
  }

  async getManifests(repositoryId: string): Promise<ManifestFile[]> {
    return prisma.manifestFile.findMany({
      where: { repositoryId },
      orderBy: { path: "asc" },
    });
  }

  async createManifest(
    data: Omit<ManifestFile, "id" | "createdAt" | "updatedAt">
  ): Promise<ManifestFile> {
    return prisma.manifestFile.create({
      data: {
        ...data,
        lastModified: data.lastModified || new Date(),
      },
    });
  }

  async updateManifest(
    id: string,
    data: Partial<Omit<ManifestFile, "id" | "createdAt" | "updatedAt">>
  ): Promise<ManifestFile> {
    return prisma.manifestFile.update({
      where: { id },
      data,
    });
  }

  async deleteManifest(id: string): Promise<ManifestFile> {
    return prisma.manifestFile.delete({
      where: { id },
    });
  }
}
