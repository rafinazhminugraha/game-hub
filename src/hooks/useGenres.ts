/**
 * Custom hook for fetching genres from the RAWG API.
 * Uses TanStack Query for caching and state management.
 */

import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import {
  parseRawgResponse,
  RawgGenreListResponseSchema,
} from "../services/rawg-schemas";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

/**
 * Fetches the list of available game genres.
 * @returns A query object containing genre data, loading state, and errors.
 */
const useGenres = () => {
  return useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get("/genres", {
        signal,
      });

      const parsed = parseRawgResponse(
        RawgGenreListResponseSchema,
        response.data,
        "genres",
      );

      return parsed.results as Genre[];
    },
    staleTime: 1000 * 60 * 60 * 24, // Genres change rarely, cache for 24 hours
  });
};

export default useGenres;
