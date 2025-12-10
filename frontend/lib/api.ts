/**
 * Get the API base URL based on environment
 * - In browser: Use window.location.hostname with port 8000
 * - This allows the same code to work on localhost and LAN IP
 */
export function getApiBaseUrl(): string {
  // Prefer explicit env var when provided
  const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envBase && envBase.trim().length > 0) {
    return envBase;
  }

  // Fallbacks for local/dev
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return `http://${hostname}:8000`;
  }
  return 'http://localhost:8000';
}
