import { describe, expect, it } from "vitest";
import { parseRawgResponse, RawgGamesResponseSchema } from "./rawg-schemas";

describe("RawgGamesResponseSchema", () => {
  it("sanitizes sparse search payloads instead of throwing", () => {
    const sparsePayload = {
      count: 1,
      next: null,
      results: [
        {
          id: 10,
          name: "Example Game",
          background_image: null,
          rating: 4.2,
          // parent_platforms intentionally missing from RAWG-like search payload
          genres: [
            {
              id: 1,
              name: "Action",
              slug: "action",
              // image_background intentionally missing
            },
          ],
        },
      ],
    };

    const parsed = parseRawgResponse(
      RawgGamesResponseSchema,
      sparsePayload,
      "games",
    );

    // Critical flow: optional fields are normalized so UI never receives undefined arrays/strings.
    expect(parsed.results[0].parent_platforms).toEqual([]);
    expect(parsed.results[0].genres[0].image_background).toBe("");
  });
});
