import apiClient from "../services/api-client";
import { type Platform } from "./usePlatforms";
import { type Genre } from "./useGenres";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  parseRawgResponse,
  RawgGamesResponseSchema,
  type RawgGamesResponse,
} from "../services/rawg-schemas";

// 3. Look for the API Doc to see the structer (use postman and hit the endpoint)
// 4. make the interface to get ony needed data (Destructering)

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
}

export interface GameQuery {
  genre?: string;
  platform?: string;
  sort?: string;
  search?: string;
  pageSize?: number; // optional page size override
}

// 5. Make the Costum hooks so we can use it anywhere on our app
const useGames = ({
  genre,
  platform,
  sort,
  search,
  pageSize = 20,
}: GameQuery) => {
  //---------------------------------------------------------------------
  //      USING TANSTACK QUERY (useInfiniteQuery for pagination)
  //---------------------------------------------------------------------
  // Note: include all filter params into the query key so React Query
  // resets/fetches fresh data when any filter changes.
  const queryKey = ["games", genre, platform, sort, search, pageSize];

  const query = useInfiniteQuery<
    RawgGamesResponse,
    Error,
    InfiniteData<RawgGamesResponse, number>,
    readonly unknown[],
    number
  >({
    queryKey,
    // Important: page 1 is the first request, then React Query increments
    // using the value returned from getNextPageParam below.
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
      // lastPage.next is a URL like "...?page=3"
      if (!lastPage?.next) return undefined;
      try {
        const url = new URL(lastPage.next);
        const next = url.searchParams.get("page");
        return next ? Number(next) : undefined;
      } catch {
        return undefined;
      }
    },
    // Optional defaults — you can tune these in src/lib/queryClient instead
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  // Expose the infinite-query surface:
  // - data.pages contains every fetched RAWG page
  // - isLoading / error remain
  // - fetchNextPage / hasNextPage etc.
  return query;

  //---------------------------------------------------------------------
  //      USING TANSTACK QUERY (EASY FETCHING CACHING AND EVERYTHING)
  //---------------------------------------------------------------------
  // const { isLoading, error, data } = useQuery<Game[]>({
  //   queryKey: ["games", genre, platform, sort, search],
  //   queryFn: async ({ signal }) => {
  //     const response = await apiClient.get<FetchResponse>("/games", {
  //       signal,
  //       params: {
  //         genres: genre || undefined,
  //         platforms: platform || undefined,
  //         ordering: sort || undefined,
  //         search: search || undefined,
  //       },
  //     });
  //     return response.data.results;
  //   },
  // });
  // return { isLoading, error, data };
  //---------------------------------------------------------------------
  //                  USING NATIVE FETCH FROM JS AND REACT
  //---------------------------------------------------------------------
  // //usually there's data, error and loading
  // const [games, setGames] = useState<Game[]>([]);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const controller = new AbortController();
  //   // if (!genre && !platform && !sort && !search) return;
  //   const fetchGame = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await apiClient.get<FetchResponse>("/games", {
  //         signal: controller.signal,
  //         params: {
  //           genres: genre || undefined,
  //           platforms: platform || undefined,
  //           ordering: sort || undefined,
  //           search: search || undefined,
  //         },
  //       });
  //       setGames(res.data.results);
  //       setLoading(false)
  //     } catch (e) {
  //       if (e instanceof CanceledError) {
  //         return;
  //       }
  //       if (e instanceof AxiosError) {
  //         setError(e.message);
  //       }
  //     }
  //     // always bug when using finally in strict mode
  //     // Use this when production!!
  //     // finally {
  //     //   setLoading(false)
  //     // }
  //   };
  //   fetchGame();
  //   return () => controller.abort();
  // }, [genre, platform, sort, search]);
  // return { games, error, loading };
};

export default useGames;
