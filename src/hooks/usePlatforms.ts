/**
 * Custom hook for fetching gaming platforms from the RAWG API.
 * Uses TanStack Query for caching and state management.
 */

import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import {
  parseRawgResponse,
  RawgPlatformListResponseSchema,
} from "../services/rawg-schemas";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

/**
 * Fetches the list of available gaming platforms.
 * @returns A query object containing platform data, loading state, and errors.
 */
const usePlatforms = () => {
  return useQuery<Platform[]>({
    queryKey: ["platforms"],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get("/platforms", {
        signal,
      });

      const parsed = parseRawgResponse(
        RawgPlatformListResponseSchema,
        response.data,
        "platforms",
      );

      return parsed.results as Platform[];
    },
    staleTime: 1000 * 60 * 60 * 24, // Platforms change rarely, cache for 24 hours
  });
};

export default usePlatforms;
