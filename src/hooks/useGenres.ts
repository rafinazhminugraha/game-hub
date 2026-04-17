// Same idea as platforms -- RAWG accepts genre by slug string for /games?genres=
// Slugs are lowercase-hyphenated identifiers from the API.
//
// Source: https://api.rawg.io/api/genres?key=YOUR_KEY
// You could also fetch this dynamically from the API (more advanced).
// For now, a static list is simpler and fast.

import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface Genre {
  id: number;
  name: string; // displayed in the UI
  slug: string; // sent to the API as the filter value
}

interface FetchResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await apiClient.get<FetchResponse>("/genres");
        setGenres(res.data.results);
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e.message);
        }
      }
    };

    fetchGenres();
  }, []);

  return { genres };
};

export default useGenres;
