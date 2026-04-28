import apiClient from "../services/api-client";
import { type Platform } from "./usePlatforms";
import { type Genre } from "./useGenres";
import { useQuery } from "@tanstack/react-query";

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

interface FetchResponse {
  count: number;
  results: Game[];
}

export interface GameQuery {
  genre?: string;
  platform?: string;
  sort?: string;
  search?: string;
}

// 5. Make the Costum hooks so we can use it anywhere on our app
const useGames = ({ genre, platform, sort, search }: GameQuery) => {
  //---------------------------------------------------------------------
  //      USING TANSTACK QUERY (EASY FETCHING CACHING AND EVERYTHING)
  //---------------------------------------------------------------------
  const { isLoading, error, data } = useQuery<Game[]>({
    queryKey: ["games", genre, platform, sort, search],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get<FetchResponse>("/games", {
        signal,
        params: {
          genres: genre || undefined,
          platforms: platform || undefined,
          ordering: sort || undefined,
          search: search || undefined,
        },
      });

      return response.data.results;
    },
  });

  return { isLoading, error, data };

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
