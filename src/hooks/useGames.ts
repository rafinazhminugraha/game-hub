/**
 * Custom hook for fetching games from the RAWG API.
 * Implements infinite scroll pagination using TanStack Query.
 */

import apiClient from "../services/api-client";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  parseRawgResponse,
  RawgGamesResponseSchema,
  type RawgGamesResponse,
  type RawgGame,
} from "../services/rawg-schemas";

export type Game = RawgGame;


export interface GameQuery {
  genre?: string;
  platform?: string;
  sort?: string;
  search?: string;
  pageSize?: number;
}

/**
 * Fetches a paginated list of games based on the provided query filters.
 * @param query - Object containing filters like genre, platform, sort, and search.
 * @returns An infinite query object containing game data and pagination controls.
 */
const useGames = ({
  genre,
  platform,
  sort,
  search,
  pageSize = 20,
}: GameQuery) => {
  const queryKey = ["games", genre, platform, sort, search, pageSize];

  return useInfiniteQuery<
    RawgGamesResponse,
    Error,
    InfiniteData<RawgGamesResponse, number>,
    readonly unknown[],
    number
  >({
    queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const response = await apiClient.get("/games", {
        signal,
        params: {
          page: pageParam,
          page_size: pageSize,
          genres: genre || undefined,
          platforms: platform || undefined,
          ordering: sort || undefined,
          search: search || undefined,
        },
      });
      return parseRawgResponse(RawgGamesResponseSchema, response.data, "games");
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined;
      try {
        const url = new URL(lastPage.next);
        const next = url.searchParams.get("page");
        return next ? Number(next) : undefined;
      } catch {
        return undefined;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache stale time
    retry: 1,
  });
};

export default useGames;
