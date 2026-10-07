import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

/**
 * Standard API success response returned by the NestJS backend.
 *
 * Example:
 * {
 *   success: true,
 *   message: "User fetched successfully",
 *   data: {...}
 * }
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Standard pagination response.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    meta: PaginationMeta;
  };
}

/**
 * Default NestJS validation error response.
 *
 * Example:
 * {
 *   "statusCode": 400,
 *   "message": [
 *      "email must be an email"
 *   ],
 *   "error": "Bad Request"
 * }
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

/**
 * Generic API request options.
 * Extends Axios config so every request can override defaults.
 */
export interface ApiRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  /**
   * Skip automatic authentication handling.
   * Useful for login and refresh endpoints.
   */
  skipAuth?: boolean;

  /**
   * Skip automatic retry after refresh.
   */
  skipRetry?: boolean;
}

/**
 * Extended Axios request config.
 * Internal use only by interceptors.
 */
export interface RetryAxiosRequestConfig<D = unknown>
  extends InternalAxiosRequestConfig<D> {
  /**
   * Prevent infinite refresh loops.
   */
  _retry?: boolean;

  /**
   * Skip authentication interceptor.
   */
  skipAuth?: boolean;

  /**
   * Skip retry mechanism.
   */
  skipRetry?: boolean;
}

/**
 * Authentication payload.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Generic authentication response.
 * Replace `unknown` with your User type later.
 */
export interface AuthResponse<T = unknown> {
  user: T;
}

/**
 * Generic API list response.
 */
export interface ListResponse<T> {
  items: T[];
}

/**
 * HTTP methods supported by our API client.
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
