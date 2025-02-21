import { useClusters } from "@/lib/hooks/useClusters";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useClusters", () => {
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

  beforeEach(() => {
    vi.spyOn(global, "fetch").mockReset();
  });

  it("should fetch clusters on mount", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockCluster]),
    } as Response);

    const { result } = renderHook(() => useClusters());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.clusters).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clusters).toEqual([mockCluster]);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: { message: "Failed to fetch" } }),
    } as Response);

    const { result } = renderHook(() => useClusters());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual({
      message: "Failed to fetch",
      code: "FETCH_ERROR",
    });
  });

  it("should create a new cluster", async () => {
    const newCluster = { ...mockCluster, id: "new-id" };
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(newCluster),
    } as Response);

    const { result } = renderHook(() => useClusters());

    const createData = {
      name: "new-cluster",
      context: "new-context",
      status: "connected",
      version: "v1.26.0",
      nodes: 5,
      lastSync: new Date(),
    };

    const createdCluster = await result.current.createCluster(createData);

    expect(createdCluster).toEqual(newCluster);
    expect(global.fetch).toHaveBeenCalledWith("/api/clusters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createData),
    });
  });

  it("should handle create errors", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: { message: "Failed to create" } }),
    } as Response);

    const { result } = renderHook(() => useClusters());

    const createData = {
      name: "new-cluster",
      context: "new-context",
      status: "connected",
      version: "v1.26.0",
      nodes: 5,
      lastSync: new Date(),
    };

    await expect(result.current.createCluster(createData)).rejects.toThrow();
  });

  it("should refresh clusters", async () => {
    const updatedCluster = { ...mockCluster, name: "updated-cluster" };
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([updatedCluster]),
    } as Response);

    const { result } = renderHook(() => useClusters());

    await result.current.refreshClusters();

    await waitFor(() => {
      expect(result.current.clusters).toEqual([updatedCluster]);
    });
  });

  it("should handle refresh errors", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: { message: "Failed to refresh" } }),
    } as Response);

    const { result } = renderHook(() => useClusters());

    await result.current.refreshClusters();

    await waitFor(() => {
      expect(result.current.error).toEqual({
        message: "Failed to refresh",
        code: "REFRESH_ERROR",
      });
    });
  });
});
