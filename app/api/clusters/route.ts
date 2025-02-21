import { kubernetesService } from "@/lib/services";
import { formatErrorResponse } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    logger.info("Handling GET request for clusters");
    const clusters = await kubernetesService.getClusters();
    return NextResponse.json(clusters);
  } catch (error) {
    logger.error("Error handling GET request for clusters", error as Error);
    const { error: formattedError, status } = formatErrorResponse(error);
    return NextResponse.json(formattedError, { status });
  }
}

export async function POST(request: Request) {
  try {
    logger.info("Handling POST request for clusters");
    const data = await request.json();
    logger.debug("Creating cluster with data", { clusterData: data });

    const cluster = await kubernetesService.createCluster(data);
    return NextResponse.json(cluster);
  } catch (error) {
    logger.error("Error handling POST request for clusters", error as Error);
    const { error: formattedError, status } = formatErrorResponse(error);
    return NextResponse.json(formattedError, { status });
  }
}
