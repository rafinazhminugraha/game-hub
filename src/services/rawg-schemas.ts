import { z } from "zod";

const stringOrEmpty = z
  .string()
  .nullable()
  .transform((value) => value ?? "");

export const RawgPlatformSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export const RawgGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  // RAWG search payload may omit image_background in nested genres.
  image_background: stringOrEmpty.optional().default(""),
});

export const RawgGameSchema = z.object({
  id: z.number(),
  name: z.string(),
  background_image: stringOrEmpty,
  rating: z.number(),
  // RAWG search payload may omit parent_platforms for some items.
  parent_platforms: z
    .array(
      z.object({
        platform: RawgPlatformSchema,
      }),
    )
    .optional()
    .default([]),
  // Some search results can omit genres entirely.
  genres: z.array(RawgGenreSchema).optional().default([]),
});

export const RawgGamesResponseSchema = z.object({
  count: z.number(),
  results: z.array(RawgGameSchema),
  next: z.string().nullable().optional(),
});

export const RawgGenreListResponseSchema = z.object({
  count: z.number(),
  results: z.array(RawgGenreSchema),
});

export const RawgPlatformListResponseSchema = z.object({
  count: z.number(),
  results: z.array(RawgPlatformSchema),
});

export const RawgGamePlatformSchema = z.object({
  platform: RawgPlatformSchema,
  released_at: z.string(),
  requirements: z.object({
    minimum: z.string().optional(),
    recommended: z.string().optional(),
  }),
});

export const RawgGameDetailsSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  name_original: z.string(),
  description: z.string(),
  metacritic: z
    .number()
    .nullable()
    .transform((value) => value ?? 0),
  released: z.string(),
  background_image: stringOrEmpty,
  website: stringOrEmpty,
  rating: z.number(),
  playtime: z.number(),
  esrb_rating: z
    .object({
      name: z.string(),
    })
    .nullable(),
  platforms: z.array(RawgGamePlatformSchema),
  reddit_url: stringOrEmpty,
});

export type RawgGamesResponse = z.infer<typeof RawgGamesResponseSchema>;
export type RawgGenre = z.infer<typeof RawgGenreSchema>;
export type RawgPlatform = z.infer<typeof RawgPlatformSchema>;
export type RawgGameDetails = z.infer<typeof RawgGameDetailsSchema>;

export function parseRawgResponse<T>(
  schema: z.ZodType<T>,
  data: unknown,
  label: string,
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".") || label}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid RAWG ${label} response: ${message}`);
  }

  return result.data;
}
