import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface FetchResponse {
  count: number;
  results: Platform[];
}

const usePlatforms = () => {
  //---------------------------------------------------------------------
  //      USING TANSTACK QUERY (EASY FETCHING CACHING AND EVERYTHING)
  //---------------------------------------------------------------------
  const { isLoading, error, data } = useQuery<Platform[]>({
    queryKey: ["platforms"],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get<FetchResponse>("/platforms", {
        signal,
      });

      return response.data.results;
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
