/**
 * Axios instance configured for the RAWG API.
 * Includes the base URL and API key from environment variables.
 */

import axios, { CanceledError } from "axios";

const apiClient = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY,
  },
});

export default apiClient;
export { CanceledError };