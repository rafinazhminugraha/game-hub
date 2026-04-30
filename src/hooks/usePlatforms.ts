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

const usePlatforms = () => {
  //---------------------------------------------------------------------
  //      USING TANSTACK QUERY (EASY FETCHING CACHING AND EVERYTHING)
  //---------------------------------------------------------------------
  const { isLoading, error, data } = useQuery<Platform[]>({
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
  });

  return { isLoading, error, data };

  //---------------------------------------------------------------------
  //                  USING NATIVE FETCH FROM JS AND REACT
  //---------------------------------------------------------------------
  // const [platforms, setPlatforms] = useState<Platform[]>([]);
  // useEffect(() => {
  //   const fetchPlatforms = async () => {
  //     try {
  //       const res = await apiClient.get<FetchResponse>("/platforms");
  //       setPlatforms(res.data.results);
  //     } catch (e) {
  //       if (e instanceof AxiosError) {
  //         console.log(e);
  //       }
  //     }
  //   };
  //   fetchPlatforms();
  // }, []);
  // return { platforms };
};

export default usePlatforms;
