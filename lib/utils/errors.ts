export class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export class ValidationError extends ServiceError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(message, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class DatabaseError extends ServiceError {
  constructor(message: string, details?: unknown) {
    super(message, "DATABASE_ERROR", 500, details);
    this.name = "DatabaseError";
  }
}

export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}

export function formatErrorResponse(error: unknown) {
  if (isServiceError(error)) {
    return {
      error: {
        message: error.message,
        code: error.code,
        ...(error.details ? { details: error.details } : {}),
      },
      status: error.statusCode,
    };
  }

  // Handle unknown errors
  console.error("Unexpected error:", error);
  return {
    error: {
      message: "An unexpected error occurred",
      code: "INTERNAL_ERROR",
    },
    status: 500,
  };
}
