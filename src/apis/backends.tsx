export const baseUrl = process.env.REACT_APP_BASE_URL;
export const servicePath1 = "backend1";
export const servicePath2 = "backend2";

// getBaseUrl Returns base url to use for the backend APIs
// In prod mode, this function returns base_url + service_path to route accordingly
// In dev mode, this function returns base_url alone since it assumes auth middleware backend is skipped
export function getBaseUrl(servicePath: string): string {
  if (process.env.NODE_ENV === "production") {
    return `${baseUrl}/${servicePath}`;
  }
  return `${baseUrl}`;
}
