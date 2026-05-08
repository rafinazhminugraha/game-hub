/**
 * Application router configuration.
 * Defines routes and implements data prefetching for the game details page.
 */

import { createBrowserRouter } from "react-router-dom";
import { RootLayouts } from "./components/layout/RootLayouts";
import { NotFound } from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import { GameDetails } from "./pages/GameDetails";
import { queryClient } from "./lib/queryClient";
import apiClient from "./services/api-client";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "games/:id",
        element: <GameDetails />,
        // Prefetch game details into the cache before rendering the component
        loader: async ({ params }) => {
          const id = params.id;
          if (!id) return null;
          
          await queryClient.fetchQuery({
            queryKey: ["game", id],
            queryFn: async ({ signal }) => {
              const res = await apiClient.get(`/games/${id}`, { signal });
              return res.data;
            },
          });
          return null;
        },
      },
    ],
  },
]);

