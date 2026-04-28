import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";

type gameParams = {
  id?: string;
};

export interface gameDetails {
  id: number;
  slug: string;
  name: string;
  description: string;
  released: string;
  background_image: string;
}

export const GameDetails = () => {
  const { id } = useParams<gameParams>();

  const {
    data: game,
    isLoading,
    isError,
    error,
  } = useQuery<gameDetails>({
    queryKey: ["game", id],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get(`/games/${id}`, { signal });
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>{(error as Error)?.message}</p>;

  return (
    <div className="py-10 px-30 flex flex-col gap-6">
      {/* banner */}
      <header className="relative w-full h-62.5 md:h-87.5 lg:h-112.5 overflow-hidden rounded-xl">
        <img
          src={game?.background_image}
          alt={game?.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

        <div className="relative z-10 h-full flex items-end p-4 md:p-6 lg:p-8">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
            {game?.name}
          </h1>
        </div>
      </header>

      {/* content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left: main content */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-tx-muted leading-relaxed">{game?.description}</p>
          </div>
        </div>

        {/* right: metadata */}
        <aside className="bg-surface rounded-xl p-4 space-y-3">
          <div>
            <p className="text-sm text-tx-muted">Release Date</p>
            <p className="font-medium">{game?.released}</p>
          </div>

          <div>
            <p className="text-sm text-tx-muted">Slug</p>
            <p className="font-medium break-all">{game?.slug}</p>
          </div>

          <div>
            <p className="text-sm text-tx-muted">Game ID</p>
            <p className="font-medium">{game?.id}</p>
          </div>
        </aside>
      </section>
    </div>
  );
};
