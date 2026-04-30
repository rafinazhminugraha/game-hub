// Same idea as platforms -- RAWG accepts genre by slug string for /games?genres=
// Slugs are lowercase-hyphenated identifiers from the API.
//
// Source: https://api.rawg.io/api/genres?key=YOUR_KEY
// You could also fetch this dynamically from the API (more advanced).
// For now, a static list is simpler and fast.

import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import {
  parseRawgResponse,
  RawgGenreListResponseSchema,
} from "../services/rawg-schemas";

export interface Genre {
  id: number;
  name: string; // displayed in the UI
  slug: string; // sent to the API as the filter value
  image_background: string;
}

const useGenres = () => {
  //---------------------------------------------------------------------
  //      USING TANSTACK QUERY (EASY FETCHING CACHING AND EVERYTHING)
  //---------------------------------------------------------------------
  const { isLoading, error, data } = useQuery<Genre[]>({
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
  });

  return { isLoading, error, data };

  //---------------------------------------------------------------------
  //                  USING NATIVE FETCH FROM JS AND REACT
  //---------------------------------------------------------------------
  // const [genres, setGenres] = useState<Genre[]>([]);
  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     try {
  //       const res = await apiClient.get<FetchResponse>("/genres");
  //       setGenres(res.data.results);
  //     } catch (e) {
  //       if (e instanceof AxiosError) {
  //         console.log(e.message);
  //       }
  //     }
  //   };
  //   fetchGenres();
  // }, []);
  // return { genres };
};

export default useGenres;
