import { AxiosError } from "axios";
import { ApiErrorResponse } from "./types";

/**
 * Base API Error
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: string | string[];

  constructor(
    message: string,
    statusCode: number,
    details?: string | string[]
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 400
 */
export class ValidationError extends ApiError {
  constructor(details?: string | string[]) {
    super("Validation failed", 400, details);
    this.name = "ValidationError";
  }
}

/**
 * 401
 */
export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

/**
 * 403
 */
export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

/**
 * 404
 */
export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

/**
 * 409
 */
export class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(message, 409);
    this.name = "ConflictError";
  }
}

/**
 * 422
 */
export class UnprocessableEntityError extends ApiError {
  constructor(details?: string | string[]) {
    super("Unprocessable Entity", 422, details);
    this.name = "UnprocessableEntityError";
  }
}

/**
 * 500
 */
export class ServerError extends ApiError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
    this.name = "ServerError";
  }
}

/**
 * Network Error
 */
export class NetworkError extends ApiError {
  constructor(message = "Network Error") {
    super(message, 0);
    this.name = "NetworkError";
  }
}

/**
 * Unknown Error
 */
export class UnknownError extends ApiError {
  constructor(message = "Something went wrong") {
    super(message, -1);
    this.name = "UnknownError";
  }
}

/**
 * Convert Axios error into our custom error classes.
 */
export function mapAxiosError(error: AxiosError<ApiErrorResponse>): never {
  // No response means network/CORS/server unreachable
  if (!error.response) {
    throw new NetworkError(error.message);
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      throw new ValidationError(data?.message);

    case 401:
      throw new UnauthorizedError(
        Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "Unauthorized"
      );

    case 403:
      throw new ForbiddenError(
        Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "Forbidden"
      );

    case 404:
      throw new NotFoundError(
        Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "Not Found"
      );

    case 409:
      throw new ConflictError(
        Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "Conflict"
      );

    case 422:
      throw new UnprocessableEntityError(data?.message);

    default:
      if (status >= 500) {
        throw new ServerError(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || "Server Error"
        );
      }

      throw new UnknownError(
        Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || error.message
      );
  }
}
