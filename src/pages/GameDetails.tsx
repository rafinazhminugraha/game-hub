import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import parse from "html-react-parser";
import {
  parseRawgResponse,
  RawgGameDetailsSchema,
  type RawgGameDetails,
} from "../services/rawg-schemas";

type gameParams = {
  id?: string;
};

export const GameDetails = () => {
  const { id } = useParams<gameParams>();

  const {
    data: game,
    isLoading,
    isError,
    error,
  } = useQuery<RawgGameDetails>({
    queryKey: ["game", id],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get(`/games/${id}`, { signal });
      return parseRawgResponse(
        RawgGameDetailsSchema,
        response.data,
        "game details",
      );
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="p-10 animate-pulse text-tx-muted">
        Loading game details...
      </div>
    );
  if (isError)
    return (
      <div className="p-10 text-red-500">
        Error: {(error as Error)?.message}
      </div>
    );
  if (!game) return null;

  const getMetacriticColor = (score: number) => {
    if (score >= 75) return "border-green-500 text-green-500";
    if (score >= 50) return "border-yellow-500 text-yellow-500";
    return "border-red-500 text-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 lg:px-10 flex flex-col gap-8">
      {/* Hero Section */}
      <header className="relative w-full h-80 md:h-125 overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={game.background_image}
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex gap-2 mb-3">
              {game.platforms.map((p) => (
                <span
                  key={p.platform.id}
                  className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-2 py-1 rounded"
                >
                  {p.platform.name}
                </span>
              ))}
            </div>
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black">
              {game.name}
            </h1>
          </div>

          {game.metacritic && (
            <div
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg border-2 bg-black/50 backdrop-blur-md ${getMetacriticColor(game.metacritic)}`}
            >
              <span className="text-2xl font-bold">{game.metacritic}</span>
              <span className="text-[10px] uppercase font-bold">Meta</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Description & Media */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            {/* RAWG returns HTML; use dangerouslySetInnerHTML carefully or a library like 'html-react-parser' */}
            <div className="prose prose-invert max-w-none text-tx-muted leading-relaxed" />
            {parse(game.description)}
          </div>

          {game.platforms.some((p) => p.requirements.minimum) && (
            <div>
              <h2 className="text-xl font-bold mb-4">System Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {game.platforms
                  .filter((p) => p.requirements.minimum)
                  .map((p) => (
                    <div
                      key={p.platform.id}
                      className="bg-surface p-4 rounded-lg border border-white/5"
                    >
                      <p className="font-bold text-primary mb-2">
                        {p.platform.name}
                      </p>
                      <p className="whitespace-pre-line text-tx-muted italic">
                        {p.requirements.minimum}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Metadata Sidebar */}
        <aside className="space-y-6">
          <div className="bg-surface rounded-2xl p-6 border border-white/5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-tighter text-tx-muted font-bold">
                  Release Date
                </p>
                <p className="font-medium">
                  {new Date(game.released).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-tighter text-tx-muted font-bold">
                  Playtime
                </p>
                <p className="font-medium">{game.playtime} Hours</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-tighter text-tx-muted font-bold">
                  ESRB Rating
                </p>
                <p className="font-medium">
                  {game.esrb_rating?.name || "Not Rated"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-tighter text-tx-muted font-bold">
                  Status
                </p>
                <p className="font-medium text-green-400">Available</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {game.website && (
                <a
                  href={game.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-4 bg-transparent text-tx-main border border-border font-bold rounded-lg hover:bg-surface-hover transition-colors"
                >
                  Official Website
                </a>
              )}
              {game.reddit_url && (
                <a
                  href={game.reddit_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-4 bg-[#FF4500] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Reddit Community
                </a>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
