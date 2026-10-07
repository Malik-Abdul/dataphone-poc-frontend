/**
 * Removes null, undefined and empty string values.
 *
 * Example:
 * {
 *   page: 1,
 *   search: "",
 *   role: undefined
 * }
 *
 * =>
 *
 * {
 *   page: 1
 * }
 */
export function removeEmptyValues<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  ) as Partial<T>;
}

/**
 * Converts an object into URLSearchParams.
 *
 * Example:
 *
 * buildQueryParams({
 *   page:1,
 *   limit:10,
 *   search:"john"
 * })
 *
 * =>
 *
 * page=1&limit=10&search=john
 */
export function buildQueryParams(
  params?: Record<string, unknown>
): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (!params) {
    return searchParams;
  }

  const filtered = removeEmptyValues(params);

  Object.entries(filtered).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, String(item));
      });

      return;
    }

    searchParams.append(key, String(value));
  });

  return searchParams;
}

/**
 * Converts an object into FormData.
 *
 * Supports:
 * - File
 * - Blob
 * - Arrays
 * - Primitive values
 */
export function objectToFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item as Blob);
      });

      return;
    }

    if (value instanceof Blob || value instanceof File) {
      formData.append(key, value);
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
}

/**
 * Is browser?
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Is server?
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Joins URL parts safely.
 *
 * joinUrl(
 *   "http://localhost:7003/",
 *   "/users",
 * )
 *
 * =>
 *
 * http://localhost:7003/users
 */
export function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/**
 * Download a Blob as a file.
 */
export function downloadFile(blob: Blob, filename: string): void {
  if (!isClient()) {
    return;
  }

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}

/**
 * Returns true if object has no own properties.
 */
export function isEmptyObject(value: object): boolean {
  return Object.keys(value).length === 0;
}
