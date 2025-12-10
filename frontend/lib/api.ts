/**
 * Get the API base URL based on environment
 * - In browser: Use window.location.hostname with port 8000
 * - This allows the same code to work on localhost and LAN IP
 */
export function getApiBaseUrl(): string {
  const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!envBase || envBase.trim().length === 0) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not set. Please configure it in your environment.'
    );
  }
  return envBase;
}
