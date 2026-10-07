import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { setupInterceptors } from "./interceptor";
import { ApiRequestConfig, ApiResponse } from "./types";

class ApiClient {
  private readonly client: AxiosInstance;
  public readonly plainClient: AxiosInstance;

  constructor() {
    const defaultConfig: AxiosRequestConfig = {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      timeout: 30_000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    this.client = axios.create(defaultConfig);

    this.plainClient = axios.create(defaultConfig);

    /**
     * Register request/response interceptors
     */
    setupInterceptors(this.client, this.plainClient);
  }

  /**
   * GET
   */
  async get<T>(
    url: string,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<
      ApiResponse<T>,
      AxiosResponse<ApiResponse<T>>
    >(url, config);

    return response.data;
  }

  /**
   * POST
   */
  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<
      ApiResponse<T>,
      AxiosResponse<ApiResponse<T>>,
      D
    >(url, data, config);

    return response.data;
  }

  /**
   * PUT
   */
  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<
      ApiResponse<T>,
      AxiosResponse<ApiResponse<T>>,
      D
    >(url, data, config);

    return response.data;
  }

  /**
   * PATCH
   */
  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<
      ApiResponse<T>,
      AxiosResponse<ApiResponse<T>>,
      D
    >(url, data, config);

    return response.data;
  }

  /**
   * DELETE
   */
  async delete<T>(
    url: string,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<
      ApiResponse<T>,
      AxiosResponse<ApiResponse<T>>
    >(url, config);

    return response.data;
  }

  /**
   * Upload file
   */
  async upload<T>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<
      ApiResponse<T>,
      AxiosResponse<ApiResponse<T>>
    >(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  /**
   * Download file
   */
  async download(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    const response = await this.client.get(url, {
      ...config,
      responseType: "blob",
    });

    return response.data;
  }

  /**
   * Access raw axios instance
   */
  get axios(): AxiosInstance {
    return this.client;
  }
}

/**
 * Singleton instance
 */
export const api = new ApiClient();

export default api;
