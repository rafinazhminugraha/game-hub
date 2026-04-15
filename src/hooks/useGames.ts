import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

// 3. Look for the API Doc to see the structer (use postman and hit the endpoint)
// 4. make the interface to get ony needed data (Destructering)
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  platforms: { platform: Platform }[];
  genres: Genre[];
}

interface FetchResponse {
  count: number;
  results: Game[];
}

// 5. Make the Costum hooks so we can use it anywhere on our app
const useGames = () => {
  //usually there's data, error adn loading
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get<FetchResponse>("/games");
        setGames(res.data.results);
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, []);

  return { games, error, loading };
};

export default useGames;
