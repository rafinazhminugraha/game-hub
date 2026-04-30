import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GameGrid from "./GameGrid";
import useGames from "../../hooks/useGames";
import {
  parseRawgResponse,
  RawgGamesResponseSchema,
} from "../../services/rawg-schemas";

vi.mock("../../hooks/useGames", () => ({
  default: vi.fn(),
}));

const mockedUseGames = vi.mocked(useGames);

describe("GameGrid search regression", () => {
  beforeEach(() => {
    mockedUseGames.mockReset();
  });

  it("renders games without RAWG validation error when sparse search payload is normalized", () => {
    const sparsePayload = {
      count: 1,
      next: null,
      results: [
        {
          id: 20,
          name: "Search Result",
          background_image: null,
          rating: 4.4,
          genres: [{ id: 1, name: "Action", slug: "action" }],
          // parent_platforms intentionally omitted
        },
      ],
    };

    const parsed = parseRawgResponse(
      RawgGamesResponseSchema,
      sparsePayload,
      "games",
    );

    mockedUseGames.mockReturnValue({
      data: { pages: [parsed], pageParams: [1] },
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    } as never);

    render(
      <MemoryRouter initialEntries={["/?search=ready"]}>
        <GameGrid query={{ genre: "", platform: "", sort: "" }} />
      </MemoryRouter>,
    );

    // Critical flow: UI shows parsed results and not the validation crash text.
    expect(screen.getByText("Search Result")).toBeInTheDocument();
    expect(
      screen.queryByText(/Invalid RAWG games response/i),
    ).not.toBeInTheDocument();
  });
});
