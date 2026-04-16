import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

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
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await apiClient.get<FetchResponse>("/platforms");
        setPlatforms(res.data.results);
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e);
        }
      }
    };

    fetchPlatforms();
  }, []);

  return { platforms };
};

export default usePlatforms;
