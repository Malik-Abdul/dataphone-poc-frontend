import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { API } from "./endpoints";
import { mapAxiosError } from "./errors";
import {
  ApiErrorResponse,
  ApiResponse,
  RetryAxiosRequestConfig,
} from "./types";

/**
 * Indicates whether a refresh request is currently in progress.
 */
let isRefreshing = false;

/**
 * Queue of requests waiting for the refresh request to complete.
 */
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

/**
 * Resolve or reject all queued requests.
 */
function processQueue(error?: unknown) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
}

/**
 * Register all interceptors.
 */
export function setupInterceptors(
  client: AxiosInstance,
  plainClient: AxiosInstance
) {
  /**
   * REQUEST INTERCEPTOR
   */
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      /**
       * Future enhancements:
       *
       * - Language
       * - Timezone
       * - Tenant Id
       * - Correlation Id
       */

      config.headers.Accept = "application/json";

      return config;
    },
    (error) => Promise.reject(error)
  );

  /**
   * RESPONSE INTERCEPTOR
   */
  client.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => response,

    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as RetryAxiosRequestConfig;

      /**
       * No response received.
       * Usually:
       * - Network failure
       * - CORS
       * - Backend offline
       */
      if (!error.response) {
        mapAxiosError(error);
      }

      const status = error.response.status;

      /**
       * Ignore refresh endpoint itself.
       * Prevent infinite refresh loop.
       */
      if (
        originalRequest.url === API.auth.refresh ||
        originalRequest.skipRetry
      ) {
        mapAxiosError(error);
      }

      /**
       * Handle Unauthorized
       */
      if (status === 401 && !originalRequest._retry) {
        /**
         * Another refresh request is already running.
         *
         * Queue this request.
         */
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
            });
          }).then(() => {
            return client(originalRequest);
          });
        }

        /**
         * Mark request as retried.
         */
        originalRequest._retry = true;

        /**
         * Start refresh flow.
         */
        isRefreshing = true;

        try {
          /**
           * Refresh HTTP-only cookies.
           *
           * Backend will issue new cookies.
           */
          await plainClient.post<ApiResponse>(
            API.auth.refresh,
            {},
            {
              withCredentials: true,
            }
          );

          /**
           * Refresh succeeded.
           *
           * Resume all queued requests.
           */
          processQueue();

          /**
           * Retry original request.
           */
          return client(originalRequest);
        } catch (refreshError) {
          /**
           * Refresh failed.
           *
           * Reject every queued request.
           */
          processQueue(refreshError);

          /**
           * Clear authentication state.
           *
           * Since you're using HTTP-only cookies,
           * the backend is the source of truth.
           *
           * Optionally redirect to login.
           */
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      /**
       * Any non-401 error.
       */
      mapAxiosError(error);

      /**
       * Fallback.
       *
       * mapAxiosError always throws,
       * but TypeScript requires a return.
       */
      return Promise.reject(error);
    }
  );
}
