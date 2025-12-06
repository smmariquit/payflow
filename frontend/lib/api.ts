/**
 * Get the API base URL based on environment
 * - In browser: Use window.location.hostname with port 8000
 * - This allows the same code to work on localhost and LAN IP
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return `http://${hostname}:8000`;
  }
  return 'http://localhost:8000';
}
